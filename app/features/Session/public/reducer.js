import login from './features/LogIn/reducer'
import signUp from './features/SignUp/reducer'
import linkedin from './features/ThirdParty/Linkedin/reducer'
import google from './features/ThirdParty/Google/reducer'
import facebook from './features/ThirdParty/Facebook/reducer'
import {combineReducers} from 'redux'

const visitor = combineReducers({
  login,
  signUp,
  linkedin,
  google,
  facebook
})

export default visitor
