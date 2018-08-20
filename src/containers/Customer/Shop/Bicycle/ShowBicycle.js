import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from "../../../../store/actions";

class ShowBicycle extends Component {
  componentDidMount(){
    this.props.getBicycle(this.props.match.params.id)
  }
  
  render(){
    return(
        <div>
        
        </div>
    )
  }
}

const mapStateToProps = (dispatch) => {
  return {
    bicycle: state => state.bicycle.bicycle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBicycle: (id) => dispatch(actions.fetchBicycle(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowBicycle)