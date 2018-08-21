import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navigation from '../../../components/Navigation/Navigation'
import { Menu } from 'antd'

configure({ adapter: new Adapter()})

describe('<Navigation />', () => {
  let wrapper
  
  it('when logged in as admin, it should have 3 menu items', () => {
    wrapper = shallow(<Navigation />)
    wrapper.setProps({isAdmin: true})
    expect(wrapper.find(Menu.Item)).toHaveLength(3)
  })
  
  it('when logged in as normal user it should have 2 menu items', () => {
    wrapper = shallow(<Navigation />)
    wrapper.setProps({isAdmin: false})
    expect(wrapper.find(Menu.Item)).toHaveLength(2)
  })

  it('when logged of, it should not have any menu items', () => {
    wrapper = shallow(<Navigation />)
    wrapper.setProps({isAdmin: null})
    expect(wrapper.find(Menu.Item)).toHaveLength(0)
  })
  
})
