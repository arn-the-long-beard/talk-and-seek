import * as types from './actionTypes'

export default function logInReducer (state = {}, action) {
  switch (action.type) {
    case types.CONTINUE_WITH_LINKEDIN_SUCCESS:
    case types.CONTINUE_WITH_GOOGLE_SUCCESS:
    case types.LOG_IN_SUCCESS:
      return {...state,
        isRequesting: false,
        logged: true,
        message: action.message,
        didInvalidate: false
      }
    case types.LOG_IN_FAILED:
      return {...state,
        isRequesting: false,
        logged: false,
        err: action.err,
        message: action.message,
        didInvalidate: false
      }
    case types.LOG_IN_REQUEST:
      return {...state,
        isRequesting: true,
        logged: false,
        didInvalidate: false
      }
    case types.INVALIDATE_USER:
      return {...state,
        didInvalidate: true
      }

    default:
      return state
  }
}
