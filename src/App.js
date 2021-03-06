import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'
import 'antd/dist/antd.css'

import { BackTop, Layout } from 'antd';
import Navigation from './components/Navigation/Navigation'

import AllBicycles from './containers/Bicycle/AllBicycles'
import EditBicycle from './containers/Bicycle/EditBicycle'
import ShowBicycle from './containers/Bicycle/ShowBicycle'
import Home from './containers/Home/Home'
import NewBicycle from "./containers/Bicycle/NewBicycle";

const { Content, Header } = Layout;

class App extends Component {

  render() {
    
    let content = <Content>
                    Please log in to continue.
                    <Switch>
                      <Route path="/home" exact component={Home} />
                      <Route path="/" component={Home} />
                    </Switch>
                  </Content>
    let header = <Header>
                   <Navigation isAdmin={this.props.isAdmin}/>
                 </Header>
    
    if(this.props.isAdmin === null ){
      header = null
    }
    
    if(this.props.isAdmin !== null){
    content = <Content>
                <Switch>
                  <Route path="/bicycles" exact component={AllBicycles} />
                  <Route path="/bicycles/new" exact component={NewBicycle} />
                  <Route path={"/shop"} exact component={AllBicycles} />
                  <Route path="/edit/bicycles/:id" component={EditBicycle} />
                  <Route path="/bicycles/:id" exact component={ShowBicycle} />
                  <Route path="/home" exact component={Home} />
                  <Route path="/" exact component={Home} />
                </Switch>
              </Content>
    }
    
    return (
      <div>
        <div>
          <BackTop />
        </div>
        <Layout className="container" >
          {header}
          {content}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.auth.isAdmin
  }
}

export default withRouter( connect(mapStateToProps, null) (App) )
