import React, { Component} from 'react'
import PropTypes from 'prop-types'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'
import SignupPage from './components/SignupPage'
import Login from '../../../../Tests/login'
class SignUpPage extends Component {
  /**
   * Class constructor.
   */
  constructor (props, context) {
    super(props, context)

    // set the initial component state
    // this.state = {
    //   errors: {},
    //   credentials: {
    //     email: '',
    //     firstname: '',
    //     famillyname: '',
    //     password: '',
    //     password_repeat: ''
    //   }
    // }

    this.processForm = this.processForm.bind(this)
    this.changeUser = this.changeUser.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (this.props.signUp !== prevProps.signUp) {
      // this.setState({
      //   errors: this.props.signUp.err
      // })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.signUp.hasSignedup) {
      this.context.router.history.replace('/login')
    }

    if (nextProps.login.logged) {
      this.context.router.history.replace('/myprofile')
    }
    // if (nextProps.signUp.hasSignedup) {
    //   this.context.router.history.replace('/login')
    // }
    //
    // if (nextProps.login.logged) {
    //   this.context.router.history.replace('/myprofile')
    // }
  }

  componentDidMount () {

    /* if (this.props.signup.didInvalidate) {
      this.props.actions.refreshUserIfNeeded(this.props.session)
    } */
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm (event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault()
    this.props.actions.signupUser(this.props.signUp.credentials)
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser (event) {
    const field = event.target.name
    const credentials = this.props.signUp.credentials
    credentials[field] = event.target.value
    this.props.actions.isWriting(credentials)
  }

  handleResponse ({code, redirectUri}) {
// Todo for the social login
  }

  /**
   * Render the component.
   */
  render () {
    if (!this.props.signUp.isRequesting) {
      return (
        <SignupPage
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.props.signUp.errors}
          credentials={this.props.signUp.credentials}
          isValid={this.props.signUp.isValid}
          handleResponse={this.handleResponse}
        />
      )
    } else {
      return (<Login />)
    }
  }
}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
}

SignUpPage.propTypes = {
  signUp: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  const { signUp, login } = state.session.visitor

  return {
    signUp,
    login
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)

/* <div> <MediaQuery query='(min-device-height: 1080px)' values={{ deviceHeight: 1600 }}>
        <SignupPage
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          credentials={this.state.credentials}
          handleResponse={this.handleResponse}
          styles={DesktopStyles}
        />
      </MediaQuery>
        <MediaQuery query='(max-height: 902px)'>
          <SignupPage
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={this.state.errors}
            credentials={this.state.credentials}
            handleResponse={this.handleResponse}
            styles={LaptopStyles}
          />
        </MediaQuery></div>
*/
