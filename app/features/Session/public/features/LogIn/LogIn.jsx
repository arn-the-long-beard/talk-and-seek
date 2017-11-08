import React, { Component} from 'react'
import PropTypes from 'prop-types'
import LoginForm from './components/MiniLoginForm'
import Loader from '../../../../../components/Spinner/Loader'
import cookie from 'react-cookies'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'

class LogIn extends Component {
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

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      credentials: {
        email: '',
        password: ''
      }
    }

    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (this.props.login !== prevProps.login) {
      if (this.props.login.err) {
        this.setState({
          errors: this.props.login.err
        })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    // if (nextProps.login.logged || this.props.login.logged) {
    //   this.context.router.history.replace('/')
    // }
  }

  componentDidMount () {
    if (this.props.login.didInvalidate) {
      this.props.actions.refreshUserIfNeeded(this.props.login)
    }
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  onSave (event) {
    event.preventDefault()
    this.props.actions.logInUser(this.state.credentials)
  }
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  onChange (event) {
    const field = event.target.name
    const credentials = this.state.credentials
    credentials[field] = event.target.value
    return this.setState({credentials: credentials})
  }

  /**
   * Render the component.
   */
  render () {
    if (this.props.login.didInvalidate || this.props.login.isFetching) {
      return (<Loader />)
    }
    return (
      <LoginForm
        onSubmit={this.onSave}
        onChange={this.onChange}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.credentials} />

    )
  }
}

LogIn.propTypes = {
  login: PropTypes.object.isRequired
}
LogIn.contextTypes = {
  router: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  const { login } = state.session.visitor
  return {
    login
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
