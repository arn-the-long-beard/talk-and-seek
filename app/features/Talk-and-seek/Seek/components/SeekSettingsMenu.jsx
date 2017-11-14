
import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'

const SeekSettings = ({maxResults, onChange}) => (
  <div >
    <span className={styles.label}> Maximum : {maxResults} results <select className={styles.menu} onChange={onChange} value={maxResults}>
      <option value={5}>Very Few</option>
      <option value={10}>Few</option>
      <option value={20}>Many</option>
      <option value={40}>A lot</option>
    </select> </span>
  </div>
)
SeekSettings.contextTypes = {

  insertCss: PropTypes.func
}
SeekSettings.prototype = {
  onChange: PropTypes.func.isRequired,
  maxResults: PropTypes.number.isRequired
}
export default withStyles(styles)(SeekSettings)
