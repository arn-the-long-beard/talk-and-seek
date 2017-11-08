import { Helmet } from 'react-helmet'
import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
import PropTypes from 'prop-types'
const University = () => (
  <div className={styles.container}>
    <Helmet
      title='University page'
    />
    <p className={styles.text}>Høgskole</p>
  </div>
)
University.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(University)
