import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as messageActions from '../../../../../../Messages/admin/actions'

import MessagesIcon from 'material-ui/svg-icons/communication/message'

import { MenuItem } from 'material-ui/Menu'
import Badge from 'material-ui/Badge'
class MessagesIconMenu extends Component {
  render () {
    return (<Badge
      badgeContent={5}
      badgeStyle={{top: 12, right: 12}}
      primary
    ><IconMenu
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      iconButtonElement={

        <IconButton onTouchTap={null} tooltip='Your messages' >
          <MessagesIcon />
        </IconButton>

      }
     />                                                                                                                                                                                                                                                                                                                                                                                                                      </Badge>)
  }
}

/**
 *
 * Connect to Redux store here for handling message with socket.io
 *
 */

export default MessagesIconMenu

/*
   {this.props.messages.map(function (newMessage) {
          return (<MenuItem key={newMessage._id} primaryText={newMessage.text} containerElement={<NavLink to={``} />} />)
        }
      )}
      connect(mapStateToProps)(

function mapStateToProps (state) {
  const {messages} = state
  return {
    messages
  }
}

 */
