import bicycleReducer from '../../../store/reducers/bicycle'
import * as actionTypes from '../../../store/actions/actionTypes'

describe('bicycle reducer', () => {
  it('should return the initial state', () => {
    expect(bicycleReducer(undefined, {})).toEqual(
        {
          bicycles: null,
          bicycle: null,
          error: false,
          variants: null,
          options: null,
          loading: false,
        }
    )
  })
  
  it('should handle SET_BICYCLES', () => {
    let expected_state = {
      bicycles: []
    }
    expect(
        bicycleReducer([], {
          type: actionTypes.SET_BICYCLES,
          bicycles: []
        })
    ).toEqual(expected_state)
  })
  
  it('should handle SET_BICYCLE', () => {
    let expected_state = {
      bicycle: []
    }
    expect(
        bicycleReducer([], {
          type: actionTypes.SET_BICYCLE,
          bicycle: []
        })
    ).toEqual(expected_state)
  })
  
  it('should handle SET_VARIANTS', () => {
    let expected_state = {
      variants: []
    }
    expect(
        bicycleReducer([], {
          type: actionTypes.SET_VARIANTS,
          variants: []
        })
    ).toEqual(expected_state)
  })
  
  it('should handle SET_OPTIONS', () => {
    let expected_state = {
      options: []
    }
    expect(
        bicycleReducer([], {
          type: actionTypes.SET_OPTIONS,
          options: []
        })
    ).toEqual(expected_state)
  })
  
  it('should handle SET_APPLICATION_LOADING_STATE', () => {
    let expected_state = {
      loading: true
    }
    expect(
        bicycleReducer([], {
          type: actionTypes.SET_APPLICATION_LOADING_STATE,
          loading: true
        })
    ).toEqual(expected_state)
  })
})