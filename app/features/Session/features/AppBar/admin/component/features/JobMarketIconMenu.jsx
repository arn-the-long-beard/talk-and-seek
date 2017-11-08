import React, { Component} from 'react'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'

import JobMarketIcon from 'material-ui/svg-icons/action/language'

class JobMarketIconMenu extends Component {
  constructor () {
    super()
  }

  render () {
    return (<IconMenu
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      iconButtonElement={
        <IconButton onTouchTap={null} tooltip='The job market' >
          <JobMarketIcon />
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

export default JobMarketIconMenu
