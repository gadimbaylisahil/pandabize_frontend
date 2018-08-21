import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom';

const navigation = (props) => {
  
    let menu_items = null
    
    if(props.isAdmin === true){
      menu_items =  [ <Menu.Item key="1"><Link to="/bicycles">All Bicycles</Link></Menu.Item>,
                      <Menu.Item key="2"><Link to="/bicycles/new">Create Bicycle</Link></Menu.Item>,
                      <Menu.Item key="3"><Link to="/home">Change Login</Link></Menu.Item> ]
    } else if(props.isAdmin === false) {
      menu_items =  [ <Menu.Item key="1"><Link to="/shop">Shop</Link></Menu.Item>,  <Menu.Item key="2"><Link to="/home">Change Login</Link></Menu.Item> ]
    }
    
    return(
        <Menu
            mode="horizontal"
            theme="dark"
            style={{ lineHeight: '64px' }}>
          {menu_items}
        </Menu>
    )
}

export default navigation