import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Col, Card, Checkbox, Button, Notification } from 'antd'
import * as actions from '../../store/actions/index'
import { notification } from "antd/lib/index";
const InputGroup = Input.Group;
class NewBicycle extends Component {
  state = {
    name: '',
    description: '',
    price_cents: '',
    with_options: true,
    options: [
      {
        name: null,
        option_values: null
      },
      {
        name: null,
        option_values: null
      },
      {
        name: null,
        option_values: null
      },
      {
        name: null,
        option_values: null
      },
      {
        name: null,
        option_values: null
      }
    ]
  }
  
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };
  
  createBicycle = () => {
    let options = this.state.options
    let changed_options = options.map( option => {
      let option_values = option.option_values
      if(option_values === '' || option_values === null){
        return false
      }
      option_values = option_values.split(',')
      option.option_values = []
      option_values.map( option_value => {
        option.option_values.push({
          name: option_value
        })
      })
    })
    
    let filled_options = options.filter( option => {
      return (option.name !== null) && (option.option_values !== null)
    })
    let data = {
      name: this.state.name,
      description: this.state.description,
      price_cents: this.state.price_cents,
      options: filled_options
    }
    
    this.props.createBicycle({bicycle: data})
        .then( response => {
          this.openNotificationWithIcon('success', 'You have successfully created the Bicycle.')
          this.props.history.push('/edit/bicycles/' + response.data.id)
        })
        .catch( error => {
          this.openNotificationWithIcon('error', error.response.data.message)
        })
  }
  
  handleOptionChange = (event) => {
    let options = this.state.options
    options[parseInt(event.target.id)].name = event.target.value
    this.setState({
      options: options
    })
  }
  
  toggleOptions = () => {
    this.setState({with_options: !this.state.with_options})
  }
  
  handleOptionValueChange = (event) => {
    let options = this.state.options
    options[parseInt(event.target.id)].option_values = event.target.value
    this.setState({
      options: options
    })
  }
  
  
  render(){
    console.log(this.state)
    let option_input_group = this.state.options.map( (option, index) => {
      return <InputGroup compact
                  key={index}>
        <Input style={{ width: '20%' }}
               placeholder="Option"
               id={index}
               onChange={this.handleOptionChange}
               value={this.state.options[index].name} />
        <Input style={{ width: '50%' }}
               placeholder="Values seperated by comma"
               onChange={this.handleOptionValueChange}
               id={index}
               value={this.state.options[index].option_values}/>
      </InputGroup>
    })
    return(
        <Card
            className="newBicycleForm"
            hoverable
            style={{ width: 600 }}>
          <Input addonBefore="Name" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          <Input addonBefore="Description" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          <Input addonBefore="Price" type="text" name="price_cents" value={this.state.price_cents} onChange={this.handleChange} />
          <Checkbox value="true" onChange={this.toggleOptions}>With options?</Checkbox>
          <div hidden={this.state.with_options ? true : false}>
            {option_input_group}
          </div>
          <Button type="primary" onClick={this.createBicycle}>Create</Button>
        </Card>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBicycle: (data) => dispatch(actions.postBicycles(data))
  }
}

export default connect(null, mapDispatchToProps)(NewBicycle)