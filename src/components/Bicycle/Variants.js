import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Icon, Card, notification } from 'antd'
import * as actions from "../../store/actions";

const { Meta } = Card


class Variants extends Component {
  
  getOptionValues(variant){
    const optionValues = variant.attributes.option_values.map( optionValue => {
      return optionValue.name
    })
    return optionValues.join(',')
  }
  
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };
  
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
        <List
            grid={{ gutter: 16, column: 4 }}
            itemLayout="horizontal"
            dataSource={this.props.variants.data}
            renderItem={variant => (
                <List.Item>
                  <Card title={variant.id}
                        actions={[<Icon type="setting" />,
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
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteVariant: (bicycleId, variantId) => dispatch(actions.deleteVariant(bicycleId, variantId)),
  }
}

export default connect(null, mapDispatchToProps)(Variants)