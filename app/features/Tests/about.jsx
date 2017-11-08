
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'
import styles from './styles/styles.scss'
import PropTypes from 'prop-types'
const About = () => (
  <div className={styles.container}>
    <Helmet
      title='About'
    />
    <p className={styles.text}>About, yeah nothing to say about us for now, just Ole and me working full time in the company
    We have students helping us also</p>
  </div>
)
About.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(About)
