import pandabizeApi from '../../api/pandabizeApi';
import * as actionTypes from './actionTypes';

export const setBicycles = ( bicycles ) => {
  return {
    type: actionTypes.SET_BICYCLES,
    bicycles
  }
}

export const setBicycle = ( bicycle ) => {
  return {
    type: actionTypes.SET_BICYCLE,
    bicycle
  }
}

export const fetchBicyclesFailed = () => {
  return {
    type: actionTypes.FETCH_BICYCLES_FAILED
  }
}

export const fetchBicycles = () => {
  return dispatch => {
    pandabizeApi.get( 'bicycles' )
        .then( response => {
          dispatch(setBicycles(response.data))
        })
        .catch( error => {
          dispatch(fetchBicyclesFailed())
        })
  }
}
