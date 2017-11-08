import { Helmet } from 'react-helmet'
import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
const Ads = () => (
  <div className={styles.container}>
    <Helmet
      title='Ads'
    />
    <p className={styles.text}>Adssssssssssssss PENGER PENGER</p>
  </div>
)
Ads.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(Ads)
