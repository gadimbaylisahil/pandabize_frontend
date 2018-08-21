import * as bicycleActions from "../../../store/actions/bicycle";
import * as actionTypes from "../../../store/actions/actionTypes";

describe('bicycle actions', () => {
  
  it('should create an action to set bicycles', () => {
    const bicycles = {
      data: []
    }
    const expectedAction = {
      type: actionTypes.SET_BICYCLES,
      bicycles
    }
    expect(bicycleActions.setBicycles(bicycles)).toEqual(expectedAction)
  })
  
  it('should create an action to set a bicycle', () => {
    const bicycle = {
      data: []
    }
    const expectedAction = {
      type: actionTypes.SET_BICYCLE,
      bicycle
    }
    expect(bicycleActions.setBicycle(bicycle)).toEqual(expectedAction)
  })
  
  it('should create an action to set options', () => {
    const options = {
      data: []
    }
    const expectedAction = {
      type: actionTypes.SET_OPTIONS,
      options
    }
    expect(bicycleActions.setOptions(options)).toEqual(expectedAction)
  })
  
  it('should create an action to set variants', () => {
    const variants = {
      data: []
    }
    const expectedAction = {
      type: actionTypes.SET_VARIANTS,
      variants
    }
    expect(bicycleActions.setVariants(variants)).toEqual(expectedAction)
  })
  
  it('should create an action to set application loading state', () => {
    const loading = true
    const expectedAction = {
      type: actionTypes.SET_APPLICATION_LOADING_STATE,
      loading
    }
    expect(bicycleActions.setApplicationLoadingState(loading)).toEqual(expectedAction)
  })
})