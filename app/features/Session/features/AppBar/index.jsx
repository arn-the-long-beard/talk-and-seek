import React, { Component} from 'react'
import PropTypes from 'prop-types'
import UserAppBar from './admin/component/UserAppBar'
import NoUserAppBar from './public/components/NoUserAppBar'

import {connect} from 'react-redux'
import Loader from '../../../../components/Spinner/Loader'
import ServerAddress from '../../../Server/ServerAddres'
class AppBar extends Component {
  componentWillReceiveProps (nextProps) {
    // if (nextProps.session.visitor.login.logged && (nextProps.session.visitor.login.logged  !== this.props.session.visitor.login.logged) ){
    //
    //   this.context.router.history.replace('/')
    // }
    // if (nextProps.login.logged || this.props.login.logged) {
    //   this.context.router.history.replace('/')
    // }
  }

  componentDidMount () {
    if (this.props.host) { ServerAddress.saveIp(this.props.host.server) }
  }
  render () {
    if (this.props.session.connected.login.user) {
      return (<UserAppBar user={this.props.session.connected.login.user} />)
    } else if (this.props.session.didInvalidate || this.props.session.isFetching) {
      return (<div className='top-bar'><Loader /></div>)
    } else {
      return (<NoUserAppBar />)
    }
  }
}

AppBar.propTypes = {
  session: PropTypes.object.isRequired
}

AppBar.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  const { session, host } = state

  return {
    session, host
  }
}
export default connect(mapStateToProps)(AppBar)
