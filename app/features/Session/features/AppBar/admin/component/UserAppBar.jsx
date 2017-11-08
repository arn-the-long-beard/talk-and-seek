import React, { Component} from 'react'
import SportInLogo from '../../../../../SportIn/SportInLogo'
import SportInMission from '../../../../../SportIn/SportInMission'
import GeneralSearchBar from './features/GeneralSearchBar'
import HomeIconMenu from './features/HomeIconMenu'
import JobMarketIconMenu from './features/JobMarketIconMenu'
import EventsIconMenu from './features/EventsIconMenu'
import NetWorkIconMenu from './features/NetWorkIconMenu'
import MessagesIconMenu from './features/MessagesIconMenu'
import ProfileIconMenu from './features/ProfileIconMenu'
import MenuIconButton from './features/MenuIconMenu'
import PropTypes from 'prop-types'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../../styles/styles.scss'
const AppBar = () => {
  'use strict'

  return (<Toolbar className={styles.toolbar} > <ToolbarGroup><SportInLogo />
    <SportInMission /></ToolbarGroup>
    <ToolbarGroup>
      <GeneralSearchBar />
    </ToolbarGroup>
    <ToolbarGroup>
      <HomeIconMenu />
      <JobMarketIconMenu />
      <EventsIconMenu />
      <NetWorkIconMenu />
      <MessagesIconMenu />
      <ProfileIconMenu />
      <MenuIconButton />
    </ToolbarGroup></Toolbar>)
  /*
re
<NoUserAppBar>

</NoUserAppBar>
 */
}

AppBar.contextTypes = {
  insertCss: PropTypes.func
}
export default withStyles(styles)(AppBar)
