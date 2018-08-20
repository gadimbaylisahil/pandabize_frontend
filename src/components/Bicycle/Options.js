import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Icon, Card, notification } from 'antd'
import * as actions from "../../store/actions";

class Options extends Component {
  
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  delete = (bicycleId, variantId) => {
    this.props.deleteOption(bicycleId, variantId)
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
        <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 6 }}
            itemLayout="horizontal"
            dataSource={this.props.options.data}
            renderItem={option => (
                <List.Item>
                  <Card title={option.attributes.name}
                        actions={[<Icon type="setting" />,
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
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteOption: (bicycleId, optionId) => dispatch(actions.deleteOption(bicycleId, optionId)),
    deleteOptionValue: (bicycleId, optionId, optionValueId) => dispatch(actions.deleteOptionValue(bicycleId, optionId, optionValueId))
  }
}

export default connect(null, mapDispatchToProps)(Options)