// Edit your profile

/**
 * Add an Education
 *
 *
 */
import * as types from './actionTypes'
import Api from './api'

/**
 * Add Education
 *
 *
 */

export const createForm = () => {
  return {
    type: types.CREATE_EDUCATION
  }
}
export const editForm = () => {
  return {
    type: types.EDIT_EDUCATION
  }
}
export const openEditForm = (id) => {
  if (!id) {
    return function (dispatch) {
      dispatch(createForm())
    }
  } else {
    return function (dispatch) {
      dispatch(editForm(id))
    }
  }
}

export const addEducationFailed = (json) => {
  return {
    type: types.ADD_EDUCATION_FAILED,
    err: json.err,
    message: json.message
  }
}
export const addEducationRequest = () => {
  return {
    type: types.ADD_EDUCATION_REQUEST
  }
}
export const addEducationSuccess = (json) => {
  return {
    type: types.ADD_EDUCATION_SUCCESS,
    education: json.education,
    message: json.message
  }
}

export function addEducation (education) {
  return function (dispatch) {
    dispatch(addEducationRequest())
    return Api.save(education).then(response => {
      if (response.success) {
        dispatch(addEducationSuccess(response))
      } else {
        dispatch(addEducationFailed(response))
      }
    }).catch(error => {
      dispatch(addEducationFailed(error.response.body))
    })
  }
}
