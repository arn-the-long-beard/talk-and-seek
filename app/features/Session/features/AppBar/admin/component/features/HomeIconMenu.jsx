import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'

import UniversitiesIcon from 'material-ui/svg-icons/action/home'

import { MenuItem } from 'material-ui/Menu'

class HomeIconMenu extends Component {
  constructor () {
    super()
  }

  render () {
    return (<IconMenu
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      iconButtonElement={
        <IconButton onTouchTap={null} tooltip='???' >
          <UniversitiesIcon />
        </IconButton>
      }
    >

      /**
      *
      *
      *
      *
      *
      *  Build Menu
*/
    </IconMenu>)
  }
}

export default HomeIconMenu
