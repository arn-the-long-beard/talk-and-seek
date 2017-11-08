
import React, { Component} from 'react'
import PropTypes from 'prop-types'

import cookie from 'react-cookies'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'
import GoogleButton from './components/googleButton'
import LogIn from '../../LogIn/LogIn'
// import GoogleLogin from 'react-google-login'

class Google extends Component {
  /**
   * Class constructor.
   */
  constructor (props, context) {
    super(props, context)

    const storedMessage = cookie.load('successMessage')
    let successMessage = ''
    if (storedMessage) {
      successMessage = storedMessage
      cookie.remove('successMessage')
    }
    this.state = {
      secretData: '',
      errors: {},
      successMessage
    }
    this.responseGoogle = this.responseGoogle.bind(this)
  }
//
//   componentDidUpdate (prevProps) {
// // action refresh with user data
//
//     this.props.actions.checkAccount()
//   }
//   componentWillUpdate(nextProps){
//     if(nextProps.google.APIconnected && !nextProps.google.isRequesting && !nextProps.google.isAuthorized ){
//       this.props.actions.authorize()
//     }
// }
//
//   /**
//    * This method will be executed after initial rendering.
//    */
//
//   componentDidMount () {
//     this.props.actions.connectAPI()
//
//   }
//
//   handleClick (e) {
//     e.preventDefault()
//
//   }
  responseGoogle (response) {
    console.log(response)
    this.props.actions.continueWithGoogle(response)
  }
  render () {
    if (this.props.google.isRedirected) {
      return (<LogIn />)
    } else {
      return (<div>
        <GoogleButton onSuccess={this.responseGoogle} onFailure={this.responseGoogle} />

      </div>)
    }
  }
}
//
/*
 *  <Helmet> <script type='text/javascript' src='//platform.linkedin.com/in.js' >
 api_key:'7863emate4s9z1'
 onLoad:onLinkedInLoad
 authorize:true
 lang:en_US
 scope:r_basicprofile r_emailaddress
 </script> </Helmet>
 * @type {{router: *}}
 */
Google.contextTypes = {
  router: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  const { google } = state.session.visitor

  return {
    google
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Google)
