import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Icon, Card, Button, notification, Modal, Input } from 'antd'
import * as actions from "../../store/actions";
import { withRouter } from 'react-router'

class Options extends Component {
  state = {
    editMode: false,
    name: '',
    id: null
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  edit = option => {
    this.setState({
      editMode: true,
      name: option.attributes.name,
      id: option.id
    })
  }

  handleOk = () => {
    this.update()
  }

  handleCancel = () => {
    this.setState({
      editMode: false,
      name: '',
      id: null
    })
  }

  update = () => {
    debugger;
    this.props.updateOption(this.props.match.params.id, this.state.id, { name: this.state.name })
        .then( response => {
          this.openNotificationWithIcon('success', 'You have successfully updated the Option.')
        })
        .catch( error => {
          this.openNotificationWithIcon('error', error.response.data.message)
        })
        .finally( () => {
          this.setState({
            editMode: false,
            name: '',
            id: null
          })
        })
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  delete = (bicycleId, optionId) => {
    this.props.deleteOption(bicycleId, optionId)
        .then( response => {
          this.openNotificationWithIcon('success', 'You have successfully removed the Variant.')
        })
        .catch( error => {
          this.openNotificationWithIcon('error', error.response.data.message)
        })
  }
  
  deleteValue = (bicycleId, optionId, optionValueId) => {
    this.props.deleteOptionValue(bicycleId, optionId, optionValueId)
        .then( response => {
          this.openNotificationWithIcon('success', 'You have successfully removed the Option Value.')
        })
        .catch( error => {
          this.openNotificationWithIcon('error', error.response.data.message)
        })
  }
  
  render() {
    return(
        <div>
          <Modal
              title="Edit Option"
              visible={this.state.editMode}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="Save">
            <Input addonBefore="Name" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </Modal>
          <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 6 }}
              itemLayout="horizontal"
              dataSource={this.props.options.data}
              renderItem={option => (
                  <List.Item>
                    <Card title={option.attributes.name}
                          actions={[<Icon onClick={() => this.edit(option) } type="setting" />,
                            <Icon onClick={() => this.delete(option.relationships.bicycle.data.id, option.id)}
                                  type="delete" />]}>
                      <List
                          itemLayout="horizontal"
                          dataSource={option.attributes.option_values}
                          renderItem={option_value => (
                              <List.Item>
                                <Card actions={[<Icon type="setting" />,
                                  <Icon onClick={() => this.deleteValue(option.relationships.bicycle.data.id, option.id, option_value.id)}
                                        type="delete" />]}>
                                  {option_value.name}
                                </Card>
                              </List.Item>
                          )}/>
                    </Card>
                  </List.Item>
              )}/>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteOption: (bicycleId, optionId) => dispatch(actions.deleteOption(bicycleId, optionId)),
    updateOption: (bicycleId, optionId, data) => dispatch(actions.patchOption(bicycleId, optionId, data)),
    deleteOptionValue: (bicycleId, optionId, optionValueId) => dispatch(actions.deleteOptionValue(bicycleId, optionId, optionValueId))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Options))