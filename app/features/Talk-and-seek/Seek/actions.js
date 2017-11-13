import * as types from './actionTypes'
import Api from './api'
export const askWikipediaFailed = (data) => {
  return {
    type: types.ASK_WIKIPEDIA_FAILED,
    data,
    err: data.err,
    message: data.message
  }
}
export const askWikipediaRequest = () => {
  return {
    type: types.ASK_WIKIPEDIA_REQUEST

  }
}
export const askWikipediaSuccess = (json) => {
  return {
    type: types.ASK_WIKIPEDIA_SUCCESS,
    items: json.items,
    message: json.message,
    receivedAt: Date.now()
  }
}

export const askWikipedia = () => {
  return (dispatch, getState) => {
    const { key, maxResults} = getState().talkAndSeek.seek
    dispatch(askWikipediaRequest(key))
    return Api.send(key, maxResults).then(response => {
      if (response.success) {
        dispatch(askWikipediaSuccess(response))
      } else {
        dispatch(askWikipediaFailed(response))
      }
    }).catch(error => {
      dispatch(askWikipediaFailed(key, error))
    })
  }
}

const shouldAsk = (state) => {
  const {seek} = state.talkAndSeek
  if (seek.key && seek.didInvalidate && !seek.isRequesting) {
    return true
  } else {
    return false
  }
}
export const checkIfNeedToAskWikipedia = () => {
  return (dispatch, getState) => {
    if (shouldAsk(getState())) {
      return dispatch(askWikipedia())
    }
  }
}
export const update = (value) => {
  return {
    type: types.UPDATE_MAX_RESULTS,
    maxResults: Number(value)
  }
}
export const updateMaxResults = (value) => {
  return (dispatch) => {
    return dispatch(update(value))
  }
}
