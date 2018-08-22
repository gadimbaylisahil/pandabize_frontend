import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'
import './Home.css'
import * as actions from '../../store/actions/index';

class Home extends Component {
  state = {
    selected: false
  }
  
  loginHandler = (isAdmin) => {
    this.props.login(isAdmin)
    this.props.history.push('/bicycles')
  }
  
  render () {
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