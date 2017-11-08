import { Helmet } from 'react-helmet'
import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
const Cookies = () => (
  <div className={styles.container}>
    <Helmet
      title='Cookies'
    />
    <p className={styles.text}>I like cookies</p>
  </div>
)
Cookies.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(Cookies)
