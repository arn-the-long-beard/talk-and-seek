import * as types from './actionTypes'
import sessionApi from './api'

export const uploadFailed = (file, json) => {
  return {
    type: types.UPLOAD_FILE_FAILED,
    file,
    err: json.err,
    message: json.message
  }
}
export const uploadRequest = (total) => {
  return {
    type: types.UPLOAD_FILE_REQUEST,
    total
  }
}
export const uploadSuccess = (json, index) => {
  return {
    type: types.UPLOAD_FILE_SUCCESS,
    file: json.file,
    converted: json.success,
    message: json.message,
    index
  }
}
export const addDroppedFileSuccess = (file, index, total) => {
  return {
    type: types.ADD_DROPPED_FILE,
    file,
    total,
    index
  }
}

export function AddFileForConversion (file, index, total) {
  return function (dispatch) {
    dispatch(addDroppedFileSuccess(file, index, total))
  }
}
export function AddFilesForConversion (files) {
  return function (dispatch) {
    let total = files.length
    let index = 0
    files.forEach(file => {
      dispatch(AddFileForConversion(file, index, total))
      index++
    })
    // return function (dispatch) { dispatch(addDroppedFileSuccess(files)) }
  }
}

export function resetConverter () {
  return {
    type: types.INVALIDATE_CONVERTER
  }
}

/*
export const invalidateUser = (user) => {
  return {
    type: types.INVALIDATE_USER,
    user
  }
} */
export function uploadPDF (file, index, total) {
  return function (dispatch) {
  //  dispatch(uploadRequest(file))
    dispatch(uploadRequest(total))
    return sessionApi.uploadCV(file.content).then(response => {
      if (response.success) {
        dispatch(uploadSuccess(response, index))
      } else {
        dispatch(uploadFailed(file, response, index))
      }
    }).catch(error => {
      dispatch(uploadFailed(file, error.response.body), index)
    })
  }
}
export function uploadPDFs (files) {
  return function (dispatch) {
    let total = files.length
    let index = 0
    files.forEach(file => {
      dispatch(uploadPDF(file, index, total))
      index++
    })
  }
}

export const convertFailed = (id, json) => {
  return {
    type: types.CONVERT_PDF_FAILED,
    id,
    err: json.err,
    message: json.message
  }
}
export const convertRequest = (id) => {
  return {
    type: types.CONVERT_PDF_REQUEST,
    id
  }
}
export const convertSuccess = (json) => {
  return {
    type: types.CONVERT_PDF_SUCCESS,
    code: json.code,
    message: json.message
  }
}

export function convertPDF (id) {
  return function (dispatch) {
    dispatch(convertRequest(id))
    return sessionApi.convertPDF(id).then(response => {
      if (response.success) {
        dispatch(convertSuccess(response))
      } else {
        dispatch(convertFailed(id, response))
      }
    }).catch(error => {
      dispatch(convertFailed(id, error))
    })
  }
}
