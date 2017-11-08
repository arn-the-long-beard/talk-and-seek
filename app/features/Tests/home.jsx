import { Helmet } from 'react-helmet'
import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
const Home = () => (
  <div className={styles.container}>
    <Helmet
      title='Home page'
    />
    <p className={styles.text}>Home test</p>
  </div>
)
Home.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(Home)
