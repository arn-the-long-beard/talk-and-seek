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

export const continueWithGoogleFailed = (json) => {
  return {
    type: types.CONTINUE_WITH_GOOGLE_FAILED,
    err: json.err,
    message: json.message
  }
}

export const continueWithGoogleRedirected = (json) => {
  return {
    type: types.CONTINUE_WITH_GOOGLE_REDIRECTED,
    err: json.err,
    message: json.message
  }
}

export const continueWithGoogleRequest = () => {
  return {
    type: types.CONTINUE_WITH_GOOGLE_REQUEST
  }
}
export const continueWithGoogleSuccess = (json) => {
  return {
    type: types.CONTINUE_WITH_GOOGLE_SUCCESS,
    user: json.user,
    message: json.message
  }
}

export function continueWithGoogle (data) {
  return function (dispatch) {
    dispatch(continueWithGoogleRequest())
    return Api.continueWithGoogle(data).then(response => {
      if (response.success) {
        if (!response.user) {
          dispatch(continueWithGoogleRedirected(response))
        } else {
          Auth.authenticateUser(response.token)
          dispatch(continueWithGoogleSuccess(response))
        }
      } else {
        //  Auth.authenticateUser(response.token)
        dispatch(continueWithGoogleFailed(response))
      }
    }).catch(error => {
      dispatch(continueWithGoogleFailed(error))
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
      return dispatch(continueWithGoogle(google.data))
    }
  }
}
