import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Home from './Home'

configure({ adapter: new Adapter()})

describe('<Home />', () => {
  let wrapper
  
  beforeEach( () => {
    wrapper = shallow(<Home />)
  })
  
  it('should render a card for the login', () => {
    expect(wrapper.find(<Card />)).toHaveLength(1)
  })
})
