import * as types from './actionTypes'

import Auth from '../../../../Auth/auth'

export const logoutFailed = (session) => {
  return {
    type: types.LOG_OUT_FAILED,
    message: 'Logout failed',
    session
  }
}
export const logoutRequest = (session) => {
  return {
    type: types.LOG_OUT_REQUEST,
    message: 'Your are going to logout',
    session
  }
}
export const logoutSuccess = (session) => {
  return {
    type: types.LOG_OUT_SUCCESS,
    message: 'You succeed to logout',
    session
  }
}

export const logoutUser = (session) => {
  return function (dispatch) {
    dispatch(logoutRequest(session))
    Auth.deauthenticateUser()
    if (Auth.getToken()) dispatch(logoutFailed(session))
    else dispatch(logoutSuccess(session))
  }
}
