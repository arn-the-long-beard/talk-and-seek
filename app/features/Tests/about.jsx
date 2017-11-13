
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'
import styles from './styles/styles.scss'
import PropTypes from 'prop-types'
const About = () => (
  <div className={styles.container}>
    <Helmet>
      <title>About</title>
      <meta name='description' content='what the platform is about' />
    </Helmet>
    <p className={styles.text}>This app listens to your words and seek for information in Wikipedia.</p>
  </div>
)
About.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(About)
