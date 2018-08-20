import React, { Component } from 'react'
import { connect } from "react-redux";
import { Row, notification } from 'antd';
import Bicycle from '../../../components/Bicycle/Bicycle'
import Aux from '../../../hoc/Aux/Aux'

import * as actions from '../../../store/actions/index'
// import { Redirect } from 'react-router-dom'
class AllBicycles extends Component {
  
  componentDidMount(){
    this.props.getBicycles()
  }
  
  redirectToEdit(id) {
    this.props.history.push('/edit/bicycles/' + id)
  }
  
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };
  
  removeBicycle = (id) => {
    this.props.deleteBicycle(id)
        .then( response => {
          this.openNotificationWithIcon('success', 'You have deleted the Bicycle.')
        })
        .catch( error => {
          this.openNotificationWithIcon('error', error.response.data.message)
        })
  }
  
  render() {
    let bicycles = null
    
    if(this.props.bicycles){
      bicycles = this.props.bicycles.data.map( bicycle => {
        return <Bicycle loading={this.props.loading}
                        editClicked={ () => this.redirectToEdit(bicycle.id)}
                        deleteClicked={ () => this.removeBicycle(bicycle.id)}
                        bicycle={bicycle}
                        isAdmin={this.props.isAdmin}
                        key={bicycle.id}/>
      })
    }
    
    return (
        <Aux>
          <Row>
            {bicycles}
          </Row>
        </Aux>
        )
  }
}

const mapStateToProps = state => {
  return {
    bicycles: state.bicycle.bicycles,
    isAdmin: state.auth.isAdmin,
    loading: state.bicycle.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBicycles: () => dispatch(actions.fetchBicycles()),
    deleteBicycle: (id) => dispatch(actions.deleteBicycle(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBicycles)