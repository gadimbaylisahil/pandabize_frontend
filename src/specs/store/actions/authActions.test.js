import * as actionTypes from "../../../store/actions/actionTypes";
import * as authActions from "../../../store/actions/auth";

describe('auth actions', () => {
  it('should create an action to set uset type state', () => {
    const isAdmin = true
    const expectedAction = {
      type: actionTypes.SET_USER_TYPE,
      isAdmin
    }
    expect(authActions.setUserType(isAdmin)).toEqual(expectedAction)
  })
})