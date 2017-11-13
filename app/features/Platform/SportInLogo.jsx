import React from 'react'
import logo from './images/sportin-logo-mini.png'
import styles from './styles/styles.scss'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

const SportInLogo = () => (<div><img className={styles.logo} src={logo} alt='My logo' /></div>)

SportInLogo.contextTypes = {
  insertCss: PropTypes.func
}
export default withStyles(styles)(SportInLogo)
