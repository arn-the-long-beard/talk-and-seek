import * as types from './actionTypes'

export default function logoutReducer (state = {}, action) {
  switch (action.type) {
    case types.LOG_OUT_REQUEST:
      return {...state,
        isRequesting: true,
        logged: true,
        didInvalidate: false
      }
    case types.LOG_OUT_FAILED:
      return {...state,
        isRequesting: false,
        logged: false,
        err: action.err,
        message: action.message,
        didInvalidate: false
      }
    case types.INVALIDATE_USER:
      return {...state,
        didInvalidate: true
      }
    case types.LOG_OUT_SUCCESS:
      return {...state,
        isRequesting: false,
        logged: false,
        message: action.message,
        user: null,
        didInvalidate: false
      }
    default:
      return state
  }
}
