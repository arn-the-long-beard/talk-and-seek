import { Helmet } from 'react-helmet'
import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
const Help = () => (
  <div className={styles.container}>
    <Helmet
      title='Help page'
    />
    <p className={styles.text}>Help us to build this</p>
  </div>
)
Help.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(Help)
