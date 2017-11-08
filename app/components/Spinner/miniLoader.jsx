import withStyles from 'isomorphic-style-loader/lib/withStyles'
import React from 'react'
import styles from '../../styles/loader.scss'
import PropTypes from 'prop-types'
const MiniLoader = () => (
  <div className={styles.miniloader} />
)
MiniLoader.contextTypes = {
  insertCss: PropTypes.func
}

// TODO add quotation or content when loading
export default withStyles(styles)(MiniLoader)
