import * as types from './actionTypes'

export default function Seek (state = { items: [], maxResults: 10, isRequesting: false}, action) {
  switch (action.type) {
    case types.ASK_WIKIPEDIA_FAILED:
      return {...state,
        isRequesting: false,
        didInvalidate: false,
        errors: action.err,
        message: action.message
      }
    case types.ASK_WIKIPEDIA_REQUEST:
      return {...state,
        isRequesting: true,
        didInvalidate: false
      }
    case types.ASK_WIKIPEDIA_SUCCESS:
      return {...state,
        isRequesting: false,
        didInvalidate: false,
        items: action.items,
        errors: {},
        lastUpdated: action.receivedAt,
        isValid: true,
        message: action.message
      }
    case types.VALIDATE_DATA_SUCCESS:
      return {...state,
        didInvalidate: true,
        key: action.key,
        errors: {}
      }
    case types.UPDATE_MAX_RESULTS:
      return {...state,
        maxResults: action.maxResults,
        didInvalidate: true
      }
    default:
      return state
  }
}
