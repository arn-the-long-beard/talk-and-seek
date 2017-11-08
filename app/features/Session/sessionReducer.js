import connected from './admin/reducer'
import othersSession from './private/reducer'
import visitor from './public/reducer'

import {combineReducers} from 'redux'

const session = combineReducers({
  connected,
  othersSession,
  visitor
})
export default session
