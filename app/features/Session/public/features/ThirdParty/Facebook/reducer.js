
import * as types from './actionTypes'

export default function facebookReducer (state = { errors: {}, APIconnected: false, currentApiRequest: {}}, action) {
  switch (action.type) {
    case types.CONTINUE_WITH_FACEBOOK_FAILED:
      return {...state,
        isRequesting: false,
        isAuthorized: false,
        errors: action.err,
        message: action.message
      }

    case types.CONTINUE_WITH_FACEBOOK_REDIRECTED:
      return {...state,
        isRequesting: true,
        isAuthenticated: false,
        isRedirected: true,
        didInvalidate: false
      }
    case types.CONTINUE_WITH_FACEBOOK_REQUEST:
      return {...state,
        isRequesting: true,
        isAuthenticated: false,
        didInvalidate: false,
        isAuthorized: false
      }
    case types.CONTINUE_WITH_FACEBOOK_SUCCESS:
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
