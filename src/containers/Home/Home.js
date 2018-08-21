import React, { Component } from 'react'
import {
  Redirect,
} from "react-router-dom";
import { connect } from 'react-redux'
import { Card, Button } from 'antd'
import './Home.css'
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
        return <Redirect to='/bicycles' />
    }
    return (
        <Card className="loginCard"
              title="Login"
              actions={[<Button onClick={ () => this.loginHandler(true)}>As Admin</Button>,
                        <Button onClick={ () => this.loginHandler(false)}>As Customer</Button>]}>
          <Card.Meta description="How would you like to enter the shop?" />
        </Card>
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