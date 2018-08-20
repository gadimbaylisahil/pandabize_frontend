import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'antd'

class Navigation extends Component {
  render(){
    let menu_items
    if(this.props.isAdmin === true){
      menu_items =  [ <Menu.Item key="1">Bicycles</Menu.Item>, <Menu.Item key="2">Log Out</Menu.Item> ]
    } else if(this.props.isAdmin === false) {
      menu_items =  [ <Menu.Item key="1">Shop</Menu.Item>, <Menu.Item key="2">Your Cart</Menu.Item>,  <Menu.Item key="3">Log Out</Menu.Item> ]
    } else {
      menu_items = <Menu.Item key="1">Log In</Menu.Item>
    }
    return(
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}>
          {menu_items}
        </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.auth.isAdmin
  }
}

export default connect(mapStateToProps, null)(Navigation)