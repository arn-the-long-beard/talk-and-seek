import {combineReducers} from 'redux'

import talk from './features/talk/reducer'

const rootReducer = combineReducers({
  // short hand property names
//  utilData
  talk
})
export default rootReducer
