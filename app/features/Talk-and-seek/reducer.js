import talk from './Talk/reducer'
import seek from './Seek/reducer'
import {combineReducers} from 'redux'

const talkAndSeek = combineReducers({
  talk, seek
})

export default talkAndSeek
