import { Helmet } from 'react-helmet'
import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
const Policy = () => (
  <div className={styles.container}>
    <Helmet
      title='user policy'
    />
    <p className={styles.text}>We do not sell user data to other companies</p>
  </div>
)
Policy.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(Policy)
