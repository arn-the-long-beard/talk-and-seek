import * as types from './actionTypes'
import Api from './api'
import Auth from '../../../../../Auth/auth'

/**
 * Signup
 *
 *
 */
// TODO IMPROVE ALL THIS ACTION/API

// export const connectAPIFailed = (json) => {
//   return {
//     type: types.CONNECT_API_GOOGLE_FAILED,
//     err: json.err,
//     message: json.message
//   }
// }
// export const connectAPIrequest = () => {
//   return {
//     type: types.CONNECT_API_GOOGLE_REQUEST
//
//   }
// }
// export const connectAPISuccess = (json) => {
//   return {
//     type: types.CONNECT_API_GOOGLE_SUCCESS,
//     connected: json.success
//   }
// }
//
// export function connectAPI () {
//   return function (dispatch) {
//     dispatch(connectAPIrequest())
//    // dispatch(continueRequest(credentials))
//     return Api.connect().then(response => {
//       if (response.success) {
//         dispatch(connectAPISuccess(response))
//       } else {
//         dispatch(connectAPIFailed(response))
//       }
//     }).catch(error => {
//       Error()
//     })
//   }
// }
//
// export const signinFailed = (json) => {
//   return {
//     type: types.SIGNIN_GOOGLE_FAILED,
//     err: json.err,
//     message: json.message
//   }
// }
// export const signinRequest = () => {
//   return {
//     type: types.SIGNIN_GOOGLE_REQUEST
//   }
// }
// export const signinSuccess = (json) => {
//   return {
//     type: types.SIGNIN_GOOGLE_SUCCESS,
//     connected: json.success,
//     user: json.user
//   }
// }
//
// function authorizeSuccess (json) {
//   return {
//     type: types.GET_AUTHORIZED_GOOGLE_SUCCESS,
//     isAuthorized: true,
//     google : json.google
//   }
// }
// function authorizeFailed (json) {
//   return {
//     type: types.GET_AUHTHORIZED_GOOGLE_FAILED,
//     err: json.err,
//     message: json.message
//   }
// }
// function authorizeRequest () {
//   return {
//     type: types.GET_AUTHORIZED_GOOGLE_REQUEST
//   }
// }
//
//
// export const getProfileData = (dispatch) => () => {
//   return function (dispatch) {
//     dispatch(authorizeRequest())
//     return Api.callbackFunction().then(response => {
//       if (response.success) {
//         dispatch(authorizeSuccess(response))
//      //   reponse.google.isSignedIn.listen(updateSigninStatus);
//       } else {
//         dispatch(authorizeFailed(response))
//       }
//     }).catch(error => {
//       dispatch(authorizeFailed(error.response.body))
//     })
//   }
// }
//
// // function createsaveFunctionCallBack (key, action) {
// //   return {event: key, func: action}
// // }
// //
// // function config (dispatch) {
// //   let listeners = []
// //   listeners.push(createsaveFunctionCallBack('getProfileData', getProfileData(dispatch)))
// //   return listeners[0]
// // }
//
//
// export function callback (){
//   return function (dispatch) {
//     dispatch(authorizeRequest())
//     return Api.callbackFunction().then(response => {
//       if (response.success) {
//         dispatch(authorizeSuccess(response))
//       } else {
//         dispatch(authorizeFailed(response))
//       }
//     }).catch(error => {
//       dispatch(authorizeFailed(error))
//     })
//   }
// }
// export function authorize () {
//   return function (dispatch) {
//     dispatch(signinRequest())
//     return Api.authorize(() => {
//       dispatch(authorizeRequest())
//       return Api.callbackFunction().then(response => {
//         if (response.success) {
//           dispatch(authorizeSuccess(response))
//         } else {
//           dispatch(authorizeFailed(response))
//         }
//       }).catch(error => {
//         dispatch(authorizeFailed(error))
//       })
//     }).then(response => {
//       if (response.success) {
//         dispatch(signinSuccess(response))
//       } else {
//         dispatch(signinFailed(response))
//       }
//     }).catch(error => {
//       dispatch(signinFailed(error))
//     })
//   }
//
// }

// export function authorize () {
//   return function (dispatch) {
//     dispatch(signinRequest())
//     return Api.authorize(callback).then(response => {
//       if (response.success) {
//         dispatch(signinSuccess(response))
//       } else {
//         dispatch(signinFailed(response))
//       }
//     }).catch(error => {
//       dispatch(signinFailed(error))
//     })
//   }
//
// }

export const continueWithFacebookFailed = (json) => {
  return {
    type: types.CONTINUE_WITH_FACEBOOK_FAILED,
    err: json.err,
    message: json.message
  }
}

export const continueWithFacebookRedirected = (json) => {
  return {
    type: types.CONTINUE_WITH_FACEBOOK_REDIRECTED,
    err: json.err,
    message: json.message
  }
}

export const continueWithFacebookRequest = () => {
  return {
    type: types.CONTINUE_WITH_FACEBOOK_REQUEST
  }
}
export const continueWithFacebookSuccess = (json) => {
  return {
    type: types.CONTINUE_WITH_FACEBOOK_SUCCESS,
    user: json.user,
    message: json.message
  }
}

export function continueWithFacebook (data) {
  return function (dispatch) {
    dispatch(continueWithFacebookRequest())
    if (!data.status) {
      dispatch(continueWithFacebookFailed({err: 'not possible to connect facebook', message: 'not possible to connect facebook'}))
      return
    }

    return Api.continueWithFacebook(data).then(response => {
      if (response.success) {
        if (!response.user) {
          dispatch(continueWithFacebookRedirected(response))
        } else {
          Auth.authenticateUser(response.token)
          dispatch(continueWithFacebookSuccess(response))
        }
      } else {
        //  Auth.authenticateUser(response.token)
        dispatch(continueWithFacebookFailed(response))
      }
    }).catch(error => {
      dispatch(continueWithFacebookFailed(error))
    })
  }
}
// TODO Put lifetime and condition on cookies here maybe
function shouldcontinue (state) {
  const {google} = state.session.visitor
  if (google.isAuthenticated) {
    return true
  } else {
    return false
   }
}
export function checkAccount () {
  return (dispatch, getState) => {
    const { google } = getState().session.visitor
    if (shouldcontinue(getState())) {
      return dispatch(continueWithFacebook(google.data))
    }
  }
}
