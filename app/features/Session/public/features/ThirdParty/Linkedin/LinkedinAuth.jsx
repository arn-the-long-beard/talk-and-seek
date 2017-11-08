
import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import cookie from 'react-cookies'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'
import LinkedinButton from './components/linkedinButton'
import LogIn from '../../LogIn/LogIn'
import Loader from '../../../../../../components/Spinner/miniLoader'
class Linkedin extends Component {
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
//    this.continueWithLinkedin = this.continueWithLinkedin.bind(this)

    this.handleClick=this.handleClick.bind(this)
  }

  componentDidUpdate (prevProps) {
// action refresh with user data

    this.props.actions.checkAccount()
  }

  // continueWithLinkedin ({code,state , redirectUri}) {
  //   console.log(code)
  //   console.log(redirectUri)
  //   this.props.actions.continueWithLinkedin({code,state})
  // }

  /**
   * This method will be executed after initial rendering.
   */

  componentDidMount () {
    this.props.action.connectAPI()
// action refresh with user data
 //   this.props.actions.getMyProfilerIfNeeded(this.props.myProfile)
  }
  /**
   * Render the component.
   */
  // render () {
  //   return (<div>
  //     <LinkedinButton continueWithGoogle={this.continueWithGoogle} />
  //   </div>)
  // }

  componentDidMount () {
  this.props.actions.connectAPI()
  }

  handleClick (e) {
    e.preventDefault()
    this.props.actions.authorize()
  }

  render () {
    if (this.props.linkedin.isRedirected) {
      return (<LogIn />)
    } else {
      return (<div>

        <LinkedinButton continueWithLinkedin={this.handleClick} onLoad={this.props.linkedin.isRequesting} disabled={!this.props.linkedin.APIconnected} />
      </div>)
    }
  }
}

/*     <LinkedinButton continueWithLinkedin={this.continueWithLinkedin} onLoad={this.props.linkedin.isRequesting} disabled={!this.props.linkedin.APIconnected} />
 *  <Helmet> <script type='text/javascript' src='//platform.linkedin.com/in.js' >
 api_key:'7863emate4s9z1'
 onLoad:onLinkedInLoad
 authorize:true
 lang:en_US
 scope:r_basicprofile r_emailaddress
 </script> </Helmet>
 * @type {{router: *}}
 *  <LinkedinButton continueWithLinkedin={this.continueWithLinkedin} />
 */
Linkedin.contextTypes = {
  router: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  const { linkedin } = state.session.visitor

  return {
    linkedin
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Linkedin)
