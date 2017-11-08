import * as types from './actionTypes'
import Api from './api'

/**
 * Signup
 *
 *
 */
export const signupFailed = (credentials, json) => {
  return {
    type: types.SIGNUP_FAILED,
    credentials,
    err: json.err,
    message: json.message
  }
}
export const signupRequest = (credentials) => {
  return {
    type: types.SIGNUP_REQUEST,
    credentials
  }
}
export const signupSuccess = (json) => {
  return {
    type: types.SIGNUP_SUCCESS,
    user: json.user,
    message: json.message
  }
}

export function signupUser (credentials) {
  return function (dispatch) {
    dispatch(signupRequest(credentials))
    return Api.signup(credentials).then(response => {
      if (response.success) {
        dispatch(signupSuccess(response))
      } else {
        dispatch(signupFailed(credentials, response))
      }
    }).catch(error => {
      dispatch(signupFailed(credentials, error.response.body))
    })
  }
}

/**
 * Iis Writing
 * Check the password, the name Email and stuff
 *
 * @param credentials
 * @returns {Function}
 */
export const isWritingFailedCredentials = (credentials, json) => {
  return {
    type: types.WRITING_CREDENTIALS_FAILED,
    credentials,
    err: json.errors,
    message: json.message
  }
}
export const isWritingStarted = (credentials) => {
  return {
    type: types.WRITING_CREDENTIALSP_REQUEST,
    credentials
  }
}
export const isWritingCorrectCredentials = (json) => {
  return {
    type: types.WRITING_CREDENTIALS_SUCCESS,
    credentials: json.credentials,
    message: json.message
  }
}
export function isWriting (credentials) {
  return function (dispatch) {
    dispatch(isWritingStarted(credentials))
    return Api.validate(credentials).then(response => {
      if (response.success) {
        dispatch(isWritingCorrectCredentials(response))
      } else {
        dispatch(isWritingFailedCredentials(credentials, response))
      }
    }).catch(error => {
      dispatch(signupFailed(credentials, error.response))
    })
  }
}
