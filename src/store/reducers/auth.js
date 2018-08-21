import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/update'

// Ignore local storage retrieval in test environment
const initialState = {
  isAdmin: (process.env.NODE_ENV !== 'test' && localStorage.getItem('isAdmin')) ? JSON.parse(localStorage.getItem('isAdmin')).isAdmin : null
}

const setUserType = (state, action) => {
  if(process.env.NODE_ENV !== 'test')
    localStorage.setItem('isAdmin', JSON.stringify({ isAdmin: action.isAdmin }))
  
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