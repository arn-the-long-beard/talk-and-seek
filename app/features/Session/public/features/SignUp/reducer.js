import * as types from './actionTypes'

export default function signUpReducer (state = { errors: {},
  isValid: false,
  credentials: {
    email: '',
    firstname: '',
    famillyname: '',
    password: '',
    password_repeat: ''
  }}, action) {
  switch (action.type) {
    case types.SIGNUP_FAILED:
      return {...state,
        isRequesting: false,
        errors: action.err,
        hasSignedup: false,
        message: action.message
      }
    case types.SIGNUP_REQUEST:
      return {...state,
        isRequestin: true,
        logged: false,
        didInvalidate: false
      }

    case types.SIGNUP_SUCCESS:
      return {...state,
        isRequesting: false,
        hasSignedup: true,
        message: action.message
      }

    case types.WRITING_CREDENTIALS_FAILED:
      return {...state,
        isRequesting: false,
        isValid: false,
        errors: action.err,
        hasSignedup: false,
        message: action.message
      }
    case types.WRITING_CREDENTIALSP_REQUEST:
      return {...state,
        isWriting: true,
        logged: false,
        isValid: false,
        didInvalidate: false
      }

    case types.WRITING_CREDENTIALS_SUCCESS:
      return {...state,
        isRequesting: false,
        hasSignedup: false,
        errors: {},
        isValid: true,
        message: action.message
      }
    default:
      return state
  }
}
