import React, { Component } from 'react'
import { List, Icon, Card } from 'antd'
const { Meta } = Card
class Variants extends Component {
  
  getOptionValues(variant){
    const optionValues = variant.attributes.option_values.map( optionValue => {
      return optionValue.name
    })
    return optionValues.join(',')
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
                        actions={[<Icon type="delete" />]}>
                    <Meta
                        title={variant.attributes.price_cents}
                        description={this.getOptionValues(variant)}/>
                  </Card>
                </List.Item>
            )}/>
    )
  }
}

export default Variants