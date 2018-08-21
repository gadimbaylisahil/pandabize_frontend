import React from 'react'
import { updateObject } from '../../shared/update'

describe('updateObject', () => {
  it('received oldState and updatedAttributes and returns newState', () => {
    const state = {
      name: 'Sahil',
      surname: 'Gadimbayli'
    }
    
    const updatedAttributes = {
      surname: 'Gambini'
    }
    
    const updatedState = {
      name: 'Sahil',
      surname: 'Gambini'
    }
    
    expect(updateObject(state, updatedAttributes)).toEqual(updatedState)
  })
})
