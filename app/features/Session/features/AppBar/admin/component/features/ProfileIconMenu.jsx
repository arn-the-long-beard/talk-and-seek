import React, { Component} from 'react'
import IconMenu from 'material-ui/IconMenu'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import IconButton from 'material-ui/IconButton'

import ProfileIcon from 'material-ui/svg-icons/action/account-circle'

import { MenuItem } from 'material-ui/Menu'

class ProfileIconMenu extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <IconButton onTouchTap={null} tooltip='My Page'
        containerElement={<NavLink to={`/myprofile`} />}

        >
        <ProfileIcon />
      </IconButton>)
  }
}

export default ProfileIconMenu
