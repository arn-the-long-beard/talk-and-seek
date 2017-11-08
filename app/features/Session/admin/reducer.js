import logout from './features/Logout/reducer'
import * as types from './actionTypes'
import {combineReducers} from 'redux'

function login (state = {}, action) {
  switch (action.type) {
    case types.LOG_OUT_SUCCESS:
      return {...state,
        isRequesting: false,
        logged: false,
        message: action.message,
        user: null,
        didInvalidate: false
      }
    case types.CONTINUE_WITH_LINKEDIN_SUCCESS:
    case types.CONTINUE_WITH_GOOGLE_SUCCESS:
    case types.LOG_IN_SUCCESS:
      return {...state,
        isRequesting: false,
        logged: true,
        user: action.user,
        message: action.message,
        didInvalidate: false
      }

    default:
      return state
  }
}

const connected = combineReducers({
  logout,
  login
})

export default connected
