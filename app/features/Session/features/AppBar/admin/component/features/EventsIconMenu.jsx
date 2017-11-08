import React, { Component} from 'react'
import IconMenu from 'material-ui/IconMenu'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import IconButton from 'material-ui/IconButton'

import UniversitiesIcon from 'material-ui/svg-icons/action/today'

import { MenuItem } from 'material-ui/Menu'

import Badge from 'material-ui/Badge'
class EventsIconMenu extends Component {
  constructor () {
    super()
  }

  render () {
    return (<IconMenu
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      iconButtonElement={
        <IconButton onTouchTap={null} tooltip='????' >
          <UniversitiesIcon />
        </IconButton>
      }
     />)
  }
}

export default EventsIconMenu
/*
EventsIconMenu.propTypes={
  events:PropTypes.array.isRequired
}

{events.map(function (universitySearch) {
    return (<MenuItem key={universitySearch._id} primaryText={universitySearch.name} containerElement={<NavLink to={`/admin/universitySearch/${universitySearch._id}`} />} />)
  }
)} */
/**
 *
 *
 * List of New event
 *  Button to Event pages ? calendear ?
 *
 *
 */
