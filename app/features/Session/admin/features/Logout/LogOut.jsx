import React, { Component} from 'react'
import PropTypes from 'prop-types'
import cookie from 'react-cookies'
import LogOutItem from './components/MenuItemLogout'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as sessionActions from './actions'
class LogOut extends Component {
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
      errors: {},
      successMessage
    }
    this.processForm = this.processForm.bind(this)
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm (event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault()

    // create a string for an HTTP body message

    // change the component-container state
    this.setState({
      errors: {}
    })

    // remove the toke
    this.props.actions.logoutUser(this.props.connected)
    // Auth.deauthenticateUser()
    this.context.router.history.replace('/signup')
  }

  componentDidUpdate () {
    if (!this.props.connected.login.logged) {
      this.context.router.history.replace('/signup')
    }
  }

  /**
   * Render the component.
   */
  render () {
    return (
      <LogOutItem logOut={this.processForm} />
    )
  }
}

LogOut.propTypes = {
  connected: PropTypes.object.isRequired
}
LogOut.contextTypes = {
  router: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  console.log(state)
  const { connected } = state.session

  return {
    connected
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogOut)
