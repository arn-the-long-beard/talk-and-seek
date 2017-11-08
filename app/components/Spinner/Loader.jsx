import withStyles from 'isomorphic-style-loader/lib/withStyles'
import React from 'react'
import styles from '../../styles/loader.scss'
import PropTypes from 'prop-types'
const Loader = () => (
  <div className={styles.loader} />
)
Loader.contextTypes = {
  insertCss: PropTypes.func
}

// TODO add quotation or content when loading
export default withStyles(styles)(Loader)
