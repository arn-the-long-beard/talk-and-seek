import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MyProfile from './admin/ProfilePage'
import PrivateProfile from './private/ProfilePage'
import PublicProfile from './public/ProfilePage'
import Loader from '../../components/Spinner/Loader'

class UserAppBar extends Component {
  render () {
    if (this.props.session.user && this.props.session.logged) {
      if (this.props.session.user._id === this.props.match.params.id) { return (<MyProfile />) } else {
        return <PrivateProfile />
      }
    } else if (this.props.session.didInvalidate || this.props.session.isFetching) {
      return (<div className='top-bar'><Loader /></div>)
    } else {
      return (<PublicProfile />)
    }
  }
}

UserAppBar.propTypes = {
  session: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  const { connectedSession } = state.session

  return {
    connectedSession
  }
}
export default connect(mapStateToProps)(UserAppBar)
