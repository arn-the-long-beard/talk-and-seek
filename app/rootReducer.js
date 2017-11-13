import {combineReducers} from 'redux'

import talkAndSeek from './features/Talk-and-seek/reducer'
import host from './features/Server/reducer'
const rootReducer = combineReducers({
  // short hand property names
//  utilData
  talkAndSeek,
  host
})
export default rootReducer
