import * as types from './actionTypes'
import * as profileTypes from '../../actionTypes'
import { insertItemAtEnd } from '../../../../../store/reducersUtilities'
import initialState from '../../../../../Old/reducers/initialState'
export default function myEducationReducer (state = { items: []}, action) {
  switch (action.type) {
    case types.ADD_EDUCATION_REQUEST:
      return {...state,
        isRequesting: true,
        didInvalidate: false
      }
    case profileTypes.GET_MY_PROFILE_SUCCESS:
      return {...state,
        items: initialize(state, action),
        didInvalidate: false
      }
    case types.ADD_EDUCATION_FAILED:
      return {...state,
        isRequesting: false,
        err: action.err,
        message: action.message,
        didInvalidate: false
      }
    case types.ADD_EDUCATION_SUCCESS:
      return {...state,
        isRequesting: false,
        logged: false,
        message: action.message,
        items: insertItemAtEnd(state.items, action.education),
        didInvalidate: false
      }
    case types.EDIT_EDUCATION:
      return {...state,
        items: updateStatusById(state.items, action, true)
      }

    case types.CREATE_EDUCATION:
      return {...state,
        isEditing: true
      }

    default:
      return state
  }
}
const education = (state = { isEditing: false }, action, data) => {
  switch (action.type) {
    case types.ADD_EDUCATION_REQUEST:
      return {
        ...state,
        isRequesting: true,
        didInvalidate: false
      }
    case profileTypes.GET_MY_PROFILE_SUCCESS:
      return {
        ...state,
        content: data,
        didInvalidate: false
      }
    case types.ADD_EDUCATION_FAILED:
      return {
        ...state,
        isRequesting: false,
        err: action.err,
        message: action.message,
        didInvalidate: false
      }
    case types.ADD_EDUCATION_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        logged: false,
        message: action.message,
        content: action.education,
        didInvalidate: false
      }

    case types.CREATE_EDUCATION:
      return {
        ...state,
        isEditing: true
      }
    default:
      return state
  }
}

function initialize (state, action) {
  console.log('INITILIZATION')

  action.content.curriculum.forEach((educ) => { state.items = insertItemAtEnd(state.items, education(null, action, educ)) })

  return state.items
}

function updateStatusById (array, action, statusBool) {
  return array.map(item => {
    if (item._id !== action._id) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      isEditing: statusBool
    }
  })
}
