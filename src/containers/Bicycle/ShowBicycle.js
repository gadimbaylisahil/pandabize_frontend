import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Icon } from 'antd'
import { Radio, Divider, Button, Modal, notification } from 'antd';
import * as actions from '../../store/actions/index'
import './ShowBicycle.css'

const RadioGroup = Radio.Group;

class ShowBicycle extends Component {

  state = {
    options: [],
    checkoutModal: false,
    variant: null
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  onRadioChange = (index, event) => {
    event.preventDefault()
    let options = this.state.options
    options[index].selectedValue = event.target.value
    this.setState({
      options: options
    })
  }

  handleCancel = () => {
    this.openNotificationWithIcon('warning', 'You have cancelled the order')

    this.setState({
      checkoutModal: false
    })
  }

  handleOk = () => {
    this.openNotificationWithIcon('success', 'You have purchases the bicycle')
    this.setState({
      checkoutModal: false
    })
  }

  activateCheckout() {
    let included
    let total_options = this.state.options.length
    let selected_options = this.state.options.map( option => {
        return option.selectedValue
    })
    if(selected_options.includes(null)){
      this.openNotificationWithIcon('error', 'Please select the bicycle type.')
      return
    }
    let variant = this.props.variants.data.filter( variant => {
      included = null
      included = variant.attributes.option_values.filter( option_value => selected_options.includes(option_value.id))
      return included.length === total_options
    })

    this.setState({
      checkoutModal: true,
      variant: variant[0]
    }, () => {
      console.log(this.state.checkoutModal)
    })
  }

  componentDidMount(){
    this.props.getBicycle(this.props.match.params.id)
        .then( response => {
          this.pullOptions()
          this.props.getOptions(this.props.match.params.id)
          this.props.getVariants(this.props.match.params.id)
        })
        .catch( error => {
          console.log('Bicycle not found')
        })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.options !== nextState.options) || (this.state.checkoutModal !== nextState.checkoutModal)
  }

  pullOptions = () => {
    // Get options from backend and set them in the states as array of key value pairs for creating radio buttons
    let options = []
    if (this.props.bicycle) {
      this.props.bicycle.data.attributes.options.map((option, index) => {
        let option_values = this.props.bicycle.data.attributes.option_values.filter(option_value => {
          return option_value.option_id === option.id
        })
        options.push({
          name: option.name,
          values: [],
          selectedValue: null
        })
        option_values.map(option_value => {
          options[index].values.push({
            label: option_value.name,
            value: option_value.id
          })
        })
      })
    }
    this.setState({
      options: options
    })
  }
  
  render(){
    let bicycle = null
    let options = null
    if(this.props.bicycle){
      if(this.state.options){
        options = this.state.options.map( (option, index) => {
          return (
              <div key={index}>
                <label><h3>{ option.name }:</h3></label>
                <RadioGroup size="large"
                            name={option.name}
                            key={index}
                            options={option.values}
                            onChange={(e) => this.onRadioChange(index, e)}/>
              </div> )
        })
      }
      bicycle = <Card
          className="bicycleShowCard"
          cover={<img alt="example" src="https://cdn.shopify.com/s/files/1/0232/3305/products/state_bicycle_co_green_hunter_fixie_1_1024x1024.jpg?v=1512236086" />}>
        <Card.Meta
            title={this.props.bicycle.data.attributes.name}
            description={this.props.bicycle.data.attributes.description}
        />
        <Divider orientation="center"/>
        <div>
          {options}
        </div>
        <Divider orientation="center"/>
        <Button type="primary"
                onClick={this.activateCheckout.bind(this)}>
          Continue</Button>
      </Card>
    }

    return(
        <div>
          <Modal
              title={ `Your selected variant price:
                        ${this.state.variant ? this.state.variant.attributes.price_cents / 100 : null}`}
              visible={this.state.checkoutModal}
              onOk={this.handleOk}
              okText="Purchase Now!"
              onCancel={this.handleCancel}>
            Do you want to purchase?
          </Modal>
          {bicycle}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bicycle: state.bicycle.bicycle,
    options: state.bicycle.options,
    variants: state.bicycle.variants
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBicycle: (id) => dispatch(actions.fetchBicycle(id)),
    getOptions: (id) => dispatch(actions.fetchOptions(id)),
    getVariants: (id) => dispatch(actions.fetchVariants(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowBicycle)