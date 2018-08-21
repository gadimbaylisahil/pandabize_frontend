import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Icon, Card, notification, Input, Modal } from 'antd'
import { withRouter } from 'react-router-dom'
import * as actions from "../../store/actions";

class Variants extends Component {
  
  state = {
    editMode: false,
    price_cents: null,
    sku: null,
    id: null
  }
  
  getOptionValues = (variant) => {
    const optionValues = variant.attributes.option_values.map( optionValue => {
      return optionValue.name
    })
    return optionValues.join(',')
  }
  
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    })
  }
  
  edit = variant => {
    this.setState({
      editMode: true,
      price_cents: variant.attributes.price_cents,
      sku: variant.attributes.sku,
      id: variant.id
    })
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleOk = () => {
    this.update()
  }
  
  handleCancel = () => {
    this.setState({
      editMode: false,
      price_cents: null,
      sku: null,
      id: null,
    })
  }
  
  update = () => {
    let data = {
      variant: {
        price_cents: this.state.price_cents,
        sku: this.state.sku
      }
    }
    
    this.props.updateVariant(this.props.match.params.id, this.state.id, data )
        .then( reponse => {
          this.openNotificationWithIcon('success', 'You have successfully updated the Variant.')
        })
        .catch( error => {
          this.openNotificationWithIcon('error', error.response.data.message)
        })
        .finally(() => {
          this.setState({
            editMode: false,
            price_cents: null,
            sku: null,
            id: null,
          })
        })
  }
  
  delete = (bicycleId, variantId) => {
    this.props.deleteVariant(bicycleId, variantId)
        .then( response => {
          this.openNotificationWithIcon('success', 'You have successfully removed the Variant.')
        })
        .catch( error => {
          this.openNotificationWithIcon('error', error.response.data.message)
        })
  }
  
  render() {
    return(
        <div>
          <Modal
              title="Edit Variant"
              visible={this.state.editMode}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="Save">
            <Input addonBefore="Price" type="number" name="price_cents" value={this.state.price_cents} onChange={this.handleChange} />
            <Input addonBefore="SKU" type="text" name="sku" value={this.state.sku} onChange={this.handleChange} />
          </Modal>
          <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
              itemLayout="horizontal"
              dataSource={this.props.variants.data}
              renderItem={variant => (
                  <List.Item>
                    <Card title={variant.id}
                          actions={[<Icon onClick={() => this.edit(variant) } type="setting"/>,
                            <Icon onClick={() => this.delete(variant.relationships.bicycle.data.id, variant.id) }
                                  type="delete" />]}>
                      <div>
                        <label>Price: </label>
                        <p>{variant.attributes.price_cents / 100 + "€"}</p>
                        <label>Option Values: </label>
                        <p>{this.getOptionValues(variant)}</p>
                      </div>
                    </Card>
                  </List.Item>
              )}/>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteVariant: (bicycleId, variantId) => dispatch(actions.deleteVariant(bicycleId, variantId)),
    updateVariant: (bicycleId, variantId, data) => dispatch(actions.patchVariant(bicycleId, variantId, data))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Variants))