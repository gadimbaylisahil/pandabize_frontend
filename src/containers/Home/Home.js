import React, { Component } from 'react'
import {
  Redirect,
} from "react-router-dom";
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index';

class Home extends Component {
  state = {
    selected: false
  }
  
  componentDidMount(){
    this.setState( { selected: false })
  }
  
  loginHandler(isAdmin){
    this.setState( { selected: true })
    this.props.login(isAdmin)
  }
  
  render () {
    if(this.state.selected === true) {
      if(this.props.isAdmin === true){
        return <Redirect to='/admin/bicycles' />
      } else if(this.props.isAdmin === false) {
        return <Redirect to='/bicycles' />
      }
    }
    return (
        <div>
          <h3>How would you like to enter the app?</h3>
          <button onClick={ () => this.loginHandler(true)}>As Admin</button>
          <button onClick={ () => this.loginHandler(false)}>As Customer</button>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.auth.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (isAdmin) => dispatch(actions.setUserType(isAdmin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)