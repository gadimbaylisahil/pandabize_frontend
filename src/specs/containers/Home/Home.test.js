import React from 'react'
import { configure, shallow } from 'enzyme'
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
    wrapper = shallow(<Home store={store} />)
  })

  it('should render a card for the login', () => {
    expect(wrapper.find(Card)).toHaveLength(1)
  })
  
  it('should have two buttons for each user type login', () => {
    expect(wrapper.find(Button)).toHaveLength(1)
  })
})
