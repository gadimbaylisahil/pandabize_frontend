import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Input } from 'antd'
import * as actions from '../../store/actions/index'
class NewBicycle extends Component {
  render(){
    state = {
      name: '',
      description: '',
      price_cents: '',
      options: []
    }

    handleChange = (e) => {

    }

    return(
        <Card
            hoverable
            style={{ width: 600 }}>
          <Input addonBefore="Name" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          <Input addonBefore="Description" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
        </Card>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBicycle: (data) => dispatch(actions.postBicycles(data))
  }
}

export default connect(null, mapDispatchToProps)(NewBicycle)