
import * as types from './actionTypes'

export default function googleReducer (state = { errors: {}, APIconnected: false, currentApiRequest: {}}, action) {
  switch (action.type) {
    // case types.CONNECT_API_GOOGLE_SUCCESS:
    //   return {...state,
    //     isRequesting: false,
    //     APIconnected: action.connected}
    //
    // case types.GET_AUHTHORIZED_GOOGLE_FAILED:
    //   return {...state,
    //     isRequesting: false,
    //     isAuthorized: false,
    //     errors: action.err,
    //     message: action.message
    //   }

    case types.CONTINUE_WITH_GOOGLE_FAILED:
      return {...state,
        isRequesting: false,
        isAuthorized: false,
        errors: action.err,
        message: action.message
      }
    case types.CONTINUE_WITH_GOOGLE_REDIRECTED:
      return {...state,
        isRequesting: true,
        isAuthenticated: false,
        isRedirected: true,
        didInvalidate: false
      }
    // case types.SIGNIN_GOOGLE_REQUEST:
    // case types.CONNECT_API_GOOGLE_REQUEST:
    // case types.GET_AUTHORIZED_GOOGLE_REQUEST:
    case types.CONTINUE_WITH_GOOGLE_REQUEST:

      return {...state,
        isRequesting: true,
        isAuthenticated: false,
        didInvalidate: false,
        isAuthorized: false
      }
    case types.CONTINUE_WITH_GOOGLE_SUCCESS:
    // case types.GET_AUTHORIZED_GOOGLE_SUCCESS:
      return {...state,
        isRequesting: false,
        isAuthorized: true,
        isAuthenticated: true,
        message: action.message
      }
    default:
      return state
  }
}
