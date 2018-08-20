import pandabizeApi from '../../api/pandabizeApi';
import * as actionTypes from './actionTypes';

export const setBicycles = ( bicycles ) => {
  return {
    type: actionTypes.SET_BICYCLES,
    bicycles
  }
}

export const setApplicationLoadingState = ( loading ) => {
  return {
    type: actionTypes.SET_APPLICATION_LOADING_STATE,
    loading
  }
}

export const setBicycle = ( bicycle ) => {
  return {
    type: actionTypes.SET_BICYCLE,
    bicycle
  }
}

export const setVariants = ( variants ) => {
  return {
    type: actionTypes.SET_VARIANTS,
    variants
  }
}

export const setOptions = ( options ) => {
  return {
    type: actionTypes.SET_OPTIONS,
    options
  }
}

export const fetchBicyclesFailed = () => {
  return {
    type: actionTypes.FETCH_BICYCLES_FAILED
  }
}

export const fetchBicycles = () => {
  return dispatch => {
    dispatch(setApplicationLoadingState(true))
    pandabizeApi.get( 'bicycles.json' )
        .then( response => {
          dispatch(setApplicationLoadingState(false))
          dispatch(setBicycles(response.data))
        })
        .catch( error => {
          dispatch(setApplicationLoadingState(false))
          dispatch(fetchBicyclesFailed())
        })
  }
}

export const patchBicycle = (id, data) => {
  return dispatch => {
    dispatch(setApplicationLoadingState(true))
    return new Promise( (resolve, reject) => {
      pandabizeApi.patch( 'bicycles/' + id, { bicycle: data })
          .then( response => {
            dispatch(setApplicationLoadingState(false))
            resolve(response)
          })
          .catch( error => {
            reject(error)
          })
    })
  }
}

export const deleteVariant = (bicycleId, variantId) => {
  return dispatch => {
    dispatch(setApplicationLoadingState(true))
    return new Promise( (resolve, reject) => {
      pandabizeApi.delete('bicycles/' + bicycleId + '/variants/' + variantId)
          .then( response => {
            dispatch(setApplicationLoadingState(false))
            resolve(response)
          })
          .catch( error => {
            dispatch(setApplicationLoadingState(false))
            reject(error)
          })
    })
  }
}

export const deleteOption = (bicycleId, optionId) => {
  return dispatch => {
    dispatch(setApplicationLoadingState(true))
    return new Promise( (resolve, reject) => {
      pandabizeApi.delete('bicycles/' + bicycleId + '/options/' + optionId)
          .then( response => {
            dispatch(setApplicationLoadingState(false))
            resolve(response)
          })
          .catch( error => {
            dispatch(setApplicationLoadingState(false))
            reject(error)
          })
    })
  }
}

export const deleteOptionValue = (bicycleId, optionId, optionValueId) => {
  return dispatch => {
    dispatch(setApplicationLoadingState(true))
    return new Promise( (resolve, reject) => {
      pandabizeApi.delete('bicycles/' + bicycleId + '/options/' + optionId + '/option_values/' + optionValueId)
          .then( response => {
            dispatch(setApplicationLoadingState(false))
            resolve(response)
          })
          .catch( error => {
            dispatch(setApplicationLoadingState(false))
            reject(error)
          })
    })
  }
}

export const deleteBicycle = (id) => {
  return dispatch => {
    dispatch(setApplicationLoadingState(true))
    return new Promise( (resolve, reject) => {
      pandabizeApi.delete( 'bicycles/' + id)
          .then( response => {
            dispatch(setApplicationLoadingState(false))
            resolve(response)
          })
          .catch( error => {
            reject(error)
          })
    })
  }
}

export const fetchVariants = (id) => {
  return dispatch => {
    dispatch(setApplicationLoadingState(true))
    pandabizeApi.get( 'bicycles/' + id + '/variants.json' + '?include=option_values' )
        .then( response => {
          dispatch(setApplicationLoadingState(false))
          dispatch(setVariants(response.data))
        })
        .catch( error => {
          dispatch(setApplicationLoadingState(false))
          dispatch(fetchBicyclesFailed())
        })
  }
}

export const fetchOptions = (id) => {
  return dispatch => {
    dispatch(setApplicationLoadingState(true))
    pandabizeApi.get( 'bicycles/' + id + '/options.json' )
        .then( response => {
          dispatch(setApplicationLoadingState(false))
          dispatch(setOptions(response.data))
        })
        .catch( error => {
          dispatch(setApplicationLoadingState(false))
          dispatch(fetchBicyclesFailed())
        })
  }
}

export const fetchBicycle = (id) => {
  return dispatch => {
    dispatch(setApplicationLoadingState(true))
    return new Promise( (resolve, reject) => {
      pandabizeApi.get( 'bicycles/' + id + '.json')
          .then( response => {
            dispatch(setApplicationLoadingState(false))
            dispatch(setBicycle(response.data))
            resolve(response.data)
          })
          .catch( error => {
            dispatch(setApplicationLoadingState(false))
            dispatch(fetchBicyclesFailed())
            reject(error.data)
          })
    })
  }
}
