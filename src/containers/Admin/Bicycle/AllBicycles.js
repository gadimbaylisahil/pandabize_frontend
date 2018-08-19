import React, { Component } from 'react'
import { connect } from "react-redux";
import { Row } from 'antd';
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
  
  render() {
    let bicycles = null
    
    if(this.props.bicycles){
      bicycles = this.props.bicycles.data.map( bicycle => {
        return <Bicycle editClicked={ () => this.redirectToEdit(bicycle.id)}
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
    isAdmin: state.auth.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBicycles: () => dispatch(actions.fetchBicycles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBicycles)