import * as types from './actionTypes'
import Api from './api'

/**
 * render the microphone
 *
 *
 */
// export const AskRenderMicrophone = () => {
//   return {
//     type: types.RENDER_MICROPHONE
//   }
// }
//
// export function renderMicrophone () {
//   return function (dispatch) {
//     dispatch(AskRenderMicrophone())
//   }
// }

export const stop = () => {
  return {
    type: types.STOP
  }
}
export const start = () => {
  return {
    type: types.START
  }
}

export function startRecording () {
  return function (dispatch) {
    dispatch(start())
  }
}

// this.props.actions.startRecording()
// }
export function stopRecording () {
  return function (dispatch) {
    dispatch(stop())
  }
}
export const getData = (data) => {
  return {
    type: types.HAS_STOPPED,
    data: data
  }
}

export const validateAndExtractFailed = (data) => {
  return {
    type: types.VALIDATE_DATA_FAILEDD,
    err: data.err,
    message: data.message
  }
}
export const AndExtractvalidateRequest = () => {
  return {
    type: types.VALIDATE_DATA_REQUEST

  }
}
export const validateAndExtractSuccess = (json) => {
  return {
    type: types.VALIDATE_DATA_SUCCESS,
    data: json.data,
    key: json.key
  }
}

export function validateData (result) {
  return function (dispatch, getState) {
    // We could imagine some validation and detection api here
    dispatch(AndExtractvalidateRequest(result))
    return Api.extractKeyWord(result).then(response => {
      if (response.success) {
        dispatch(validateAndExtractSuccess(response))
      } else {
        dispatch(validateAndExtractFailed(response))
      }
    }).catch(error => {
      dispatch(validateAndExtractFailed(error))
    })
  }
}

// } dispatch(askWikipediaRequest(data))
