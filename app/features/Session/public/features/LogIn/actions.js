import * as types from './actionTypes'
import sessionApi from './api'
import Auth from '../../../../Auth/auth'

export const loginFailed = (credentials, json) => {
  return {
    type: types.LOG_IN_FAILED,
    credentials,
    err: json.err,
    message: json.message
  }
}
export const loginRequest = (credentials) => {
  return {
    type: types.LOG_IN_REQUEST,
    credentials
  }
}
export const loginSuccess = (json) => {
  return {
    type: types.LOG_IN_SUCCESS,
    user: json.user,
    message: json.message
  }
}

export const invalidateUser = (user) => {
  return {
    type: types.INVALIDATE_USER,
    user
  }
}
export function logInUser (credentials) {
  return function (dispatch) {
    dispatch(loginRequest(credentials))
    return sessionApi.login(credentials).then(response => {
      if (response.success) {
        Auth.authenticateUser(response.token)
        dispatch(loginSuccess(response))
      } else {
        dispatch(loginFailed(credentials, response))
      }
    }).catch(error => {
      dispatch(loginFailed(credentials, error.response.body))
    })
  }
}

export const authLoginFailed = (json) => {
  return {
    type: types.LOG_IN_FAILED,
    err: json.err,
    message: json.message
  }
}
export const authLoginRequest = () => {
  return {
    type: types.LOG_IN_REQUEST
  }
}
export const authLoginSuccess = (json) => {
  return {
    type: types.LOG_IN_SUCCESS,
    user: json.user,
    message: json.message
  }
}

export function refreshUser () {
  return function (dispatch) {
    dispatch(authLoginRequest())
    return sessionApi.authLogin().then(response => {
      if (response.success) {
        dispatch(authLoginSuccess(response))
      } else {
        //  Auth.authenticateUser(response.token)
        dispatch(authLoginFailed(response))
      }
    }).catch(error => {
      dispatch(authLoginFailed(error.response.body))
    })
  }
}
// TODO Put lifetime and condition on cookies here maybe
function shouldLogUser (state, sessionold) {
  const {session} = state
  if (!session) {
    return true
  } else if (session.visitor.login.isFetching) {
    return false
  } // else if (session.logged && !session.user) {
    // return true
  // }
  else {
    return session.visitor.login.didInvalidate
  }
}

export function refreshUserIfNeeded (session) {
  return (dispatch, getState) => {
    if (shouldLogUser(getState(), session)) {
      return dispatch(refreshUser())
    }
  }
}
