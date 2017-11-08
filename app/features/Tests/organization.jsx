import { Helmet } from 'react-helmet'
import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
const Organization = () => (
  <div className={styles.container}>
    <Helmet
      title='Organization page'
    />
    <p className={styles.text}>For companies</p>
  </div>
)
Organization.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(Organization)
