import * as types from './actionTypes'
import {insertItemAtEnd} from './reducersUtilities'
import {removeItemById} from './reducersUtilities'
export default function pdfConverterReducer (state = { task: { completed: false, starting: false, total: 0, done: 0, items: []}}, action) {
  switch (action.type) {
    case types.UPLOAD_FILE_SUCCESS:
    case types.UPLOAD_FILE_REQUEST:
    case types.UPLOAD_FILE_FAILED:
    case types.ADD_DROPPED_FILE:
      return {
        ...state, task: files(state.task, action)
      }
    default :
      return state
  }
}

const files = (state, action) => {
  switch (action.type) {
    case types.ADD_DROPPED_FILE:
      return {
        ...state,
        items: insertItemAtEnd(state.items, file(undefined, action)),

        total: action.total

      }
    case types.UPLOAD_FILE_REQUEST:
      return {
        ...state,
        items: updateStatusAtIndex(state.items, action, true),
        starting: true
      }
    case types.UPLOAD_FILE_FAILED:
    case types.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        items: updateOriginalAndInsert(state.items, action),
     //   ...state,items : insertItemAtEnd(state.items,file(state.items[action.index],action)),
        done: state.done + 1,
        completed: state.done + 1 === state.total
      }

    default :
      return state
  }
}

const file = (state = { isUploaded: false, isConverted: false }, action) => {
  switch (action.type) {
    case types.ADD_DROPPED_FILE:
      return { ...state,
        content: action.file,
        isConverted: false,
        isUploaded: false,
        index: action.index}
    case types.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        content: action.file,
        isConverted: true,
        isUploaded: true,
        index: action.index

      }
    case types.UPLOAD_FILE_REQUEST:
      return {
        ...state, isUploaded: false, isConverted: false
      }
    case types.UPLOAD_FILE_FAILED:
      return {
        ...state,
        isConverted: action.isConverted,
        isUploaded: false,
        err: action.err
      }
    default :
      return state
  }
}
function updateStatusAtIndex (array, action, statusBool) {
  return array.map(item => {
    if (item.index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      starting: statusBool
    }
  })
}
function updateIsUploadedAtIndex (array, action, next) {
  return next(array.map(item => {
    if (item.index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      isUploaded: !item.isUploaded
    }
  }))
}

function updateOriginalAndInsert (array, action) {
  return insertItemAtEnd(array.map(item => {
    if (item.index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      isUploaded: true
    }
  }), file(undefined, action))
}
