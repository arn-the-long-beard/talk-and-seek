import * as types from './actionTypes'
import Api from './api'
import Auth from '../../../../../Auth/auth'

/**
 * Signup
 *
 *
 */
// TODO IMPROVE ALL THIS ACTION/API

export const connectAPIFailed = (json) => {
  return {
    type: types.CONNECT_API_LINKEDIN_FAILED,
    err: json.err,
    message: json.message
  }
}
export const connectAPIrequest = () => {
  return {
    type: types.CONNECT_API_LINKEDIN_REQUEST

  }
}
export const connectAPISuccess = (json) => {
  return {
    type: types.CONNECT_API_LINKEDIN_SUCCESS,
    connected: json.success
  }
}

export function connectAPI () {
  return function (dispatch) {
    dispatch(connectAPIrequest())
   // dispatch(continueRequest(credentials))
    return Api.connect().then(response => {
      if (response.success) {
        dispatch(connectAPISuccess(response))
      } else {
        dispatch(connectAPIFailed(response))
      }
    }).catch(error => {
      Error()
    })
  }
}

export const signinFailed = (json) => {
  return {
    type: types.SIGNIN_LINKEDIN_FAILED,
    err: json.err,
    message: json.message
  }
}
export const signinRequest = () => {
  return {
    type: types.SIGNIN_LINKEDIN_REQUEST
  }
}
export const signinSuccess = (json) => {
  return {
    type: types.SIGNIN_LINKEDIN_SUCCESS,
    connected: json.success,
    user: json.user
  }
}

function getProfileDataSuccess (json) {
  return {
    type: types.GET_PROFILE_DATA_LINKEDIN_SUCCESS,
    user: json.user,
    logged: true
  }
}
function getProfileDataFailed (json) {
  return {
    type: types.GET_PROFILE_DATA_LINKEDIN_FAILED,
    err: json.err,
    message: json.message
  }
}
function getProfileDataRequest () {
  return {
    type: types.GET_PROFILE_DATA_LINKEDIN_REQUEST
  }
}
export const getProfileData = (dispatch) => () => {
  return function (dispatch) {
    dispatch(getProfileDataRequest())
    return Api.callbackFunction().then(response => {
      if (response.success) {
        dispatch(getProfileDataSuccess(response))
      } else {
        dispatch(getProfileDataFailed(response))
      }
    }).catch(error => {
      dispatch(getProfileDataFailed(error))
    })
  }
}

// function createsaveFunctionCallBack (key, action) {
//   return {event: key, func: action}
// }
//
// function config (dispatch) {
//   let listeners = []
//   listeners.push(createsaveFunctionCallBack('getProfileData', getProfileData(dispatch)))
//   return listeners[0]
// }

export function authorize () {
  return function (dispatch) {
    dispatch(signinRequest())
    return Api.authorize(() => {
      dispatch(getProfileDataRequest())
      return Api.callbackFunction().then(response => {
        if (response.success) {
          dispatch(getProfileDataSuccess(response))
        } else {
          dispatch(getProfileDataFailed(response))
        }
      }).catch(error => {
        dispatch(getProfileDataFailed(error))
      })
    })
  }
}

export const continueWithLinkedinFailed = (json) => {
  return {
    type: types.CONTINUE_WITH_LINKEDIN_FAILED,
    err: json.err,
    message: json.message
  }
}

export const continueWithLinkedinRedirected = (json) => {
  return {
    type: types.CONTINUE_WITH_LINKEDIN_REDIRECTED,
    err: json.err,
    message: json.message
  }
}

export const continueWithLinkedinRequest = () => {
  return {
    type: types.CONTINUE_WITH_LINKEDIN_REQUEST
  }
}
export const continueWithLinkedinSuccess = (json) => {
  return {
    type: types.CONTINUE_WITH_LINKEDIN_SUCCESS,
    user: json.user,
    message: json.message
  }
}

export function continueWithLinkedin (data) {
  return function (dispatch) {
    dispatch(continueWithLinkedinRequest())
    return Api.continueWithLinkedin(data).then(response => {
      if (response.success) {
        if (!response.user) {
          dispatch(continueWithLinkedinRedirected(response))
        } else {
          Auth.authenticateUser(response.token)
          dispatch(continueWithLinkedinSuccess(response))
        }
      } else {
        //  Auth.authenticateUser(response.token)
        dispatch(continueWithLinkedinFailed(response))
      }
    }).catch(error => {
      dispatch(continueWithLinkedinFailed(error.response.body))
    })
  }
}
// TODO Put lifetime and condition on cookies here maybe
function shouldcontinue (state) {
  const {linkedin} = state.session.visitor
  const {login} = state.session.visitor
  if (linkedin.isAuthenticated) {
    return true
  } else {
    return false
   }
}
export function checkAccount () {
  return (dispatch, getState) => {
    const { linkedin } = getState().session.visitor
    if (shouldcontinue(getState())) {
      return dispatch(continueWithLinkedin(linkedin.data))
    }
  }
}
