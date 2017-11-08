import * as types from './actionTypes'

function myProfile (state = {}, action) {
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
import educations from './features/Education/reducer'
import converter from './features/Converter/reducer'
import {combineReducers} from 'redux'

const profile = combineReducers({
  educations,
  myProfile,
  converter
})
export default profile
