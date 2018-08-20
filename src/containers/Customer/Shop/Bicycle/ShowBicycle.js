import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from "../../../../store/actions";

class ShowBicycle extends Component {
  componentDidMount(){
    this.props.getBicycle(this.props.match.params.id)
        .then( response => {
          this.getOptions(this.props.match.params.id)
          this.getVariants(this.props.match.params.id)
        })
        .catch( error => {
          console.log('Bicycle not found')
        })
  }
  
  render(){
    return(
        <div>
          Hi there
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bicycle: state => state.bicycle.bicycle,
    options: state => state.bicycle.options
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBicycle: (id) => dispatch(actions.fetchBicycle(id)),
    getOptions: (id) => dispatch(actions.fetchOptions(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowBicycle)