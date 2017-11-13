import * as types from './actionTypes'

export default function talkReducer (state = { errors: {},
  record: false,
  hasStopped: false,
  isRecording: false,
  isReady: false}, action) {
  switch (action.type) {
    // case types.RENDER_MICROPHONE:
    //   return {...state,
    //     isReady: true
    //   }
    case types.START:
      return {...state,
        record: true,
        isRecording: true
      }
    case types.STOP:
      return {...state,
        record: false,
        isRecording: false
      }
    case types.HAS_STOPPED:
      return {...state,
        record: false,
        hasStopped: true,
        isRecording: false,
        data: action.data
      }

    case types.VALIDATE_DATA_SUCCESS:
      return {...state,
        data: action.data,
        isValidating: false,
        isValide: true
      }
    case types.VALIDATE_DATA_REQUEST:
      return {...state,
        isValidating: true
      }
    case types.VALIDATE_DATA_FAILED:
      return {...state,
        isValidating: false,
        isValide: false,
        errors: action.err
      }
    default:
      return state
  }
}
