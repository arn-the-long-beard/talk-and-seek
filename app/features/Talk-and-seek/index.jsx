
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'
import styles from './styles/styles.scss'
import PropTypes from 'prop-types'

import Talk from './Talk/Talk'
import Seek from './Seek/Seek'

const TalkAndSeek = () => (
  <div className={styles.container}>
    <Helmet>
      <title>Talk and Seek</title>
      <meta name='description' content='Talk to the platform and then it gets wikipedia data for you' />
    </Helmet>
    <Talk />
    <Seek />
  </div>
)
TalkAndSeek.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(TalkAndSeek)
