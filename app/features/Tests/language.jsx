import { Helmet } from 'react-helmet'
import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
const Language = () => (
  <div className={styles.container}>
    <Helmet
      title='Language'
    />
    <p className={styles.text}>kann du ein bischen auf deutsch sprechen ?</p>
  </div>
)
Language.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(Language)
