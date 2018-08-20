import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom';
class Navigation extends Component {
  render(){
    let menu_items
    if(this.props.isAdmin === true){
      menu_items =  [ <Menu.Item key="1"><Link to="/bicycles">All Bicycles</Link></Menu.Item>, <Menu.Item key="2"><Link to="/home">Change Login</Link></Menu.Item> ]
    } else if(this.props.isAdmin === false) {
      menu_items =  [ <Menu.Item key="1"><Link to="/shop">Shop</Link></Menu.Item>,  <Menu.Item key="2"><Link to="/home">Change Login</Link></Menu.Item> ]
    } else {
      menu_items = <Menu.Item key="1"><Link to="/home">Login</Link></Menu.Item>
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