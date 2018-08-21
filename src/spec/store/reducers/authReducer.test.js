import authReducer from '../../../store/reducers/auth'
import * as actionTypes from '../../../store/actions/actionTypes'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(
        {
          isAdmin: null
        }
    )
  })
  
  it('should handle SET_USER_TYPE', () => {
    let expected_state = {
      isAdmin: true
    }
    expect(
        authReducer([], {
          type: actionTypes.SET_USER_TYPE,
          isAdmin: true
        })
    ).toEqual(expected_state)
  })
})