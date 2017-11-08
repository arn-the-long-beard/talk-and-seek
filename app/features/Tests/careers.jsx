import { Helmet } from 'react-helmet'
import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
const Careers = () => (
  <div className={styles.container}>
    <Helmet
      title='Careers'
    />
    <p className={styles.text}>We need money before we can actually hire somebody</p>
  </div>
)
Careers.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(Careers)
