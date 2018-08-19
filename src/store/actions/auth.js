import * as actionTypes from './actionTypes';

export const setUserType = ( isAdmin ) => {
  return {
    type: actionTypes.SET_USER_TYPE,
    isAdmin
  }
}