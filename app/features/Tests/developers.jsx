import { Helmet } from 'react-helmet'
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
import PropTypes from 'prop-types'
const Developers = () => (
  <div className={styles.container}>
    <Helmet
      title='developers page'
    />
    <p className={styles.text}>Want to use our API?</p>
  </div>
)
Developers.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(Developers)
