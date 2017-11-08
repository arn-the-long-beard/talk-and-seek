import React, { Component} from 'react'
import {NavLink} from 'react-router-dom'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'

import UniversitiesIcon from 'material-ui/svg-icons/navigation/menu'
import LogOut from '../../../../../admin/features/Logout/LogOut'

class MenuIconMenu extends Component {
  render () {
    return (<IconMenu
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      iconButtonElement={
        <IconButton onTouchTap={null} tooltip='What you can do' >
          <UniversitiesIcon />
        </IconButton>
      }

    >
      <LogOut />
    </IconMenu>)
  }
}

export default MenuIconMenu
