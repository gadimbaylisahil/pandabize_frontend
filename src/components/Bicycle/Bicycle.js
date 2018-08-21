import React from 'react'
import { Card, Col, Icon } from 'antd'
const { Meta } = Card

const bicycle = (props) => {
  let actions
  
  if(props.isAdmin) {
    actions = [<Icon onClick={ props.editClicked } type="setting"/>, <Icon onClick={ props.deleteClicked } type="delete" />]
  } else {
    actions = [<Icon onClick={ props.showClicked } type="shop"/>]
  }
  
  return (
      <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
        <Card
            loading={props.loading}
            hoverable
            cover={<img alt="example" src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&h=350" />}
            actions={actions}
        >
          <Meta
              title={props.bicycle.attributes.name}
              description={props.bicycle.attributes.description}
          />
        </Card>
      </Col>
  )
}

export default bicycle