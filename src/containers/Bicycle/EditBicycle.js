import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Aux from '../../../hoc/Aux/Aux'
import { Card, Input, Icon, notification } from 'antd'
import Variants from '../../components/Bicycle/Variants'
import Options from '../../components/Bicycle/Options'
import * as actions from '../../store/actions/index'

class EditBicycle extends Component {
  state = {
    name: null,
    description: null
  }
  
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };
  
  save = () => {
    this.props.updateBicycle(this.props.match.params.id, this.state)
        .then( response => {
          this.openNotificationWithIcon('success', 'You have successfully updated the Bicycle.')
        })
        .catch( error => {
          this.openNotificationWithIcon('error', error.response.data.message)
        })
  }
  
  delete = () => {
    this.props.deleteBicycle(this.props.match.params.id)
        .then( response => {
          this.openNotificationWithIcon('success', 'You have deleted the Bicycle.')
          this.props.history.push('/admin/bicycles/')
        })
        .catch( error => {
          this.openNotificationWithIcon('error', error.response.data.message)
        })
  }
  
  componentDidMount(){
    this.props.getBicycle(this.props.match.params.id)
        .then( response => {
          this.setState({
            name: response.data.attributes.name,
            description: response.data.attributes.description
          })
          this.props.getVariants(this.props.match.params.id)
          this.props.getOptions(this.props.match.params.id)
        })
  }
  
  render() {
    let variants = null
    let options = null
    if(this.props.variants){
      variants = <Variants variants={this.props.variants}/>
    }
    if(this.props.options){
      options = <Options options={this.props.options}/>
    }
    return (
        <div>
          <Card title={`Main information for ${this.state.name}`}
                actions={[<Icon onClick={this.save} type="save" />, <Icon onClick={this.delete} type="delete" />]}
                hoverable bordered>
            <Input addonBefore="Name" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            <Input addonBefore="Description" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </Card>
          <Card title="Options"
                hoverable>
            {options}
          </Card>
          <Card title="Variants"
                hoverable>
            {variants}
          </Card>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bicycle: state.bicycle.bicycle,
    variants: state.bicycle.variants,
    options: state.bicycle.options,
    loading: state.bicycle.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBicycle: (id) => dispatch(actions.fetchBicycle(id)),
    getVariants: (id) => dispatch(actions.fetchVariants(id)),
    getOptions: (id) => dispatch(actions.fetchOptions(id)),
    updateBicycle: (id, data) => dispatch(actions.patchBicycle(id, data)),
    deleteBicycle: (id) => dispatch(actions.deleteBicycle(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBicycle)