import React, { Component} from 'react'
import IconMenu from 'material-ui/IconMenu'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'

import UniversitiesIcon from 'material-ui/svg-icons/social/group'

import { MenuItem } from 'material-ui/Menu'
import Badge from 'material-ui/Badge'
class NetWorkIconMenu extends Component {
  render () {
    return (<IconMenu
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      iconButtonElement={
        <IconButton onTouchTap={null} tooltip='See your contacts' >
          <UniversitiesIcon />
        </IconButton>
      }
    >

      /**
      *
      *
      * Build the menu
      *
      *
 */

    </IconMenu>)
  }
}

export default NetWorkIconMenu
