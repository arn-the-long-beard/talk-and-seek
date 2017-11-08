
import * as types from './actionTypes'

export default function linkedinReducer (state = { errors: {}, APIconnected: false}, action) {
  switch (action.type) {
    case types.CONNECT_API_LINKEDIN_SUCCESS:
      return {...state,
        isRequesting: false,
        APIconnected: action.connected}

    case types.GET_PROFILE_DATA_LINKEDIN_FAILED:
      return {...state,
        isRequesting: false,
        errors: action.err,
        message: action.message
      }

    case types.CONTINUE_WITH_LINKEDIN_REDIRECTED:
      return {...state,
        isRequesting: true,
        isAuthenticated: false,
        isRedirected: true,
        didInvalidate: false
      }
    case types.SIGNIN_LINKEDIN_REQUEST:
    case types.CONNECT_API_LINKEDIN_REQUEST:
    case types.CONTINUE_WITH_LINKEDIN_REQUEST:
    case types.GET_PROFILE_DATA_LINKEDIN_REQUEST:
      return {...state,
        isRequesting: true,
        isAuthenticated: false,
        didInvalidate: false
      }
    case types.GET_PROFILE_DATA_LINKEDIN_SUCCESS:
      return {...state,
        isRequesting: false,
        isAuthenticated: true,
        message: action.message,
        data: action.user
      }

    default:
      return state
  }
}
