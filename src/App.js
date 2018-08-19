import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
import 'antd/dist/antd.css'

// import * as actions from './store/actions/index'

import AllBicycles from './containers/Admin/Bicycle/AllBicycles'
import EditBicycle from './containers/Admin/Bicycle/EditBicycle'
// import Bicycles from './containers/Customer/Shop/Bicycle/Bicycles'
// import ShowBicycle from './containers/Customer/Shop/Bicycle/ShowBicycle'
// import ShoppingCart from './containers/Customer/Shop/ShoppingCart/ShoppingCart'
import Home from './containers/Home/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin/bicycles" exact component={AllBicycles} />
          <Route path="/edit/bicycles/:id" component={EditBicycle} />
          {/*<Route path="/bicycles" exact component={Bicycles} />*/}
          {/*<Route path="/bicycles/:id" exact component={ShowBicycle} />*/}
          {/*<Route path="/cart" exact component={ShoppingCart} />*/}
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter( App )
