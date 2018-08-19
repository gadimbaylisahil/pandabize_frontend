import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/update'

const initialState = {
  bicycles: null,
  bicycle: null
}

const setBicycles = (state, action) => {
  return updateObject( state, {
    bicycles: action.bicycles,
  } )
}

const setBicycle = (state, action) => {
  return updateObject( state, {
    bicycle: action.bicycle,
  } )
}

const fetchBicyclesFailed = (state, action) => {
  return updateObject( state, { error: true } )
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_BICYCLES: return setBicycles(state, action)
    case actionTypes.SET_BICYCLE: return setBicycle(state, action)
    case actionTypes.FETCH_BICYCLES_FAILED: return fetchBicyclesFailed(state, action)
    default: return state
  }
}

export default reducer