import {combineReducers} from 'redux'
import search from './features/Search/searchReducer'
import university from './features/University/universityReducer'
import host from './features/Server/reducer'
import profile from './features/Profile/reducer'
import session from './features/Session/sessionReducer'
import messages from './features/Messages/messagesReducer'
const rootReducer = combineReducers({
  // short hand property names
  university,
  profile,
  session,
  messages,
  search,
  host
//  utilData
})
export default rootReducer
