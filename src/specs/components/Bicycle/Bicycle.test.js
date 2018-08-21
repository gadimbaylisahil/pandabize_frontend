import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Bicycle from '../../../components/Bicycle/Bicycle'
import { Col, Card } from 'antd'

configure({ adapter: new Adapter()})

describe('<Bicycle />', () => {
  let wrapper
  let bicycle = {
    "id": "11",
    "type": "bicycle",
    "attributes": {
      "name": "Night Rider",
      "description": "Greates bicycle ever.",
      "options": [],
      "option_values": []
    },
    "relationships": {
      "variants": {
        "data": [
          {
            "id": "389",
            "type": "variant"
          }
        ]
      },
      "options": {
        "data": []
      }
    }
  }
  
  beforeEach( () => {
    wrapper = shallow(<Bicycle loading={ false }
                               editClicked={ () => {} }
                               showClicked={ () => {} }
                               deleteClicked={ () => {} }
                               bicycle={ bicycle }
                               isAdmin={ true }
                               key={ bicycle.id }/>)
  })
  
  it('should have main Col component', () => {
    expect(wrapper.find(Col)).toHaveLength(1)
  })
  
  it('should have have Card component', () => {
    expect(wrapper.find(Col).find(Card)).toHaveLength(1)
  })
  
})
