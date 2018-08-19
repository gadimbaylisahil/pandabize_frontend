import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/update'

const initialState = {
  isAdmin: null
}

const setUserType = (state, action) => {
  return updateObject( state, {
    isAdmin: action.isAdmin,
  })
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_USER_TYPE: return setUserType(state,action);
    default:
      return state;
  }
};

export default reducer