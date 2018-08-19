import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Aux from '../../../hoc/Aux/Aux'
import { Card, Input } from 'antd'
import * as actions from "../../../store/actions";
const { TextArea } = Input;

class EditBicycle extends Component {
  state = {
    name: null,
    description: null
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  
  componentDidMount(){
    this.props.getBicycle(this.props.match.params.id)
        .then( response => {
          this.setState({
            name: response.data.attributes.name,
            description: response.data.attributes.description
          })
        })
  }
  
  render() {
    return (
        <Card title="Main Information">
          <Input placeholder="Title" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          <TextArea placeholder="Description" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
        </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    bicycle: state.bicycle.bicycle,
    loading: state.bicycle.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBicycle: (id) => dispatch(actions.fetchBicycle(id))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(EditBicycle)