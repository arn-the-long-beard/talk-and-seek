// Edit your profile

/**
 * Add an Education
 *
 *
 */
import * as types from './actionTypes'
import Api from './api'

/**
 * get info
 *
 *
 */

export const getMyProfileFailed = (json) => {
  return {
    type: types.GET_MY_PROFILE_FAILED,
    err: json.err,
    message: json.message
  }
}
export const getMyProfileRequest = (credentials) => {
  return {
    type: types.GET_MY_PROFILE_REQUEST,
    credentials
  }
}
export const getMyProfileSuccess = (json) => {
  return {
    type: types.GET_MY_PROFILE_SUCCESS,
    content: json.user,
    message: json.message
  }
}

export const invalidateUser = (user) => {
  return {
    type: types.INVALIDATE_USER,
    user
  }
}

// TODO Put lifetime and condition on cookies here maybe
function shouldgetMyProfile (state, current) {
  const {myProfile} = state.profile.myProfile
  if (myProfile.isRequesting) {
    return false
  }
  if (!myProfile.content && !myProfile.err) {
    return true
  } else if (myProfile.isFetching) {
    return false
  } // else if (session.logged && !session.user) {
    // return true
  // }
  else {
    return myProfile.didInvalidate
  }
}

export function getMyProfilerIfNeeded (myProfile) {
  return (dispatch, getState) => {
    if (shouldgetMyProfile(getState(), myProfile)) {
      return dispatch(getMyProfile())
    }
  }
}

export function getMyProfile () {
  return function (dispatch) {
    dispatch(getMyProfileRequest())
    return Api.getMyContent().then(response => {
      if (response.success) {
        dispatch(getMyProfileSuccess(response))
      } else {
        dispatch(getMyProfileFailed(response))
      }
    }).catch(error => {
      dispatch(getMyProfileFailed(error.response.body))
    })
  }
}
