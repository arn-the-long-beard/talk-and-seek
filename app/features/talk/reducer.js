import * as types from './actionType'

export default function talk (state = {}, action) {
  switch (action.type) {
    case types.GET_MY_PROFILE_REQUEST:
      return {...state,
        isRequesting: true,
        didInvalidate: false
      }
    case types.GET_MY_PROFILE_FAILED:
      return {...state,
        isRequesting: false,
        err: action.err,
        message: action.message,
        didInvalidate: false
      }
    case types.INVALIDATE_USER:
      return {...state,
        didInvalidate: true
      }
    case types.GET_MY_PROFILE_SUCCESS:
      return {...state,
        isRequesting: false,
        logged: false,
        message: action.message,
        content: action.content,
        didInvalidate: false
      }
    default:
      return state
  }
}
