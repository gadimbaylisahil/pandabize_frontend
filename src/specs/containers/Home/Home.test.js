import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Card, Button } from 'antd'
import Home from '../../../containers/Home/Home'


configure({ adapter: new Adapter()})

describe('<Home />', () => {
  let wrapper
  let store
  const initialState = {
    auth: {
      isAdmin: true
    }
  }
  const mockStore = configureStore()
  
  beforeEach( () => {
    store = mockStore(initialState)
    wrapper = mount(<Home store={store} />)
  })

  it('should render a card for the login', () => {
    expect(wrapper.find(Card)).toBeTruthy()
  })
  
  it('should have two buttons for each user type login', () => {
    expect(wrapper.find(Card).find(Button)).toHaveLength(2)
  })
})
