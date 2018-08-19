import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AllBicycles from './containers/Admin/Bicycle/AllBicycles'
import EditBicycle from './containers/Admin/Bicycle/EditBicycle'
import Bicycles from './containers/Customer/Shop/Bicycle/Bicycles'
import ShowBicycle from './containers/Customer/Shop/Bicycle/ShowBicycle'
import ShoppingCart from './containers/Customer/Shop/ShoppingCart/ShoppingCart'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin/bicycles" exact component={AllBicycles}></Route>
          <Route path="/admin/bicycles/edit/:id" component={EditBicycle}></Route>
          <Route path="/bicycles" exact component={Bicycles}></Route>
          <Route path="/bicycles/:id" exact component={BicycleShow}></Route>
          <Route path="/cart" exact component={ShoppingCart}></Route>
        </Switch>
      </div>
    );
  }
}

export default App
