// as authentication /sign up

import React, { Component} from 'react'
import PropTypes from 'prop-types'
import SportInLogo from '../../../../../SportIn/SportInLogo'
import SportInMission from '../../../../../SportIn/SportInMission'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../../styles/styles.scss'
import SignUpButton from '../../../../components/SignUpButton'
import LoginMiniForm from '../../../../public/features/LogIn/LogIn'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

import UniversitySearch from '../../../../../Search/public/features/University/UniversitySearch'
import UserSearch from '../../../../../Search/public/features/User/UserSearch'

const NoUserAppBar = () => (<Toolbar className={styles.toolbar}>
  <ToolbarGroup firstChild>
    <SportInLogo />
    <SportInMission /></ToolbarGroup>
  <ToolbarGroup>
    <div><UniversitySearch /><UserSearch /></div>
    <ToolbarSeparator />
    <LoginMiniForm />
    <SignUpButton />
  </ToolbarGroup>
</Toolbar>)
NoUserAppBar.contextTypes = {
  insertCss: PropTypes.func
}
export default withStyles(styles)(NoUserAppBar)
