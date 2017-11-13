import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'material-ui/Card'
import styles from '../styles/styles.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
// const ReactMic = require('react-mic').ReactMic
const ReadMyVoice = ({url}) => (
  <Card >
    <div className={styles.container}>
      <audio controls='controls' src={url} />
    </div>
  </Card>
)

ReadMyVoice.propTypes = {
  url: PropTypes.string.isRequired

}

ReadMyVoice.contextTypes = {
  insertCss: PropTypes.func
}
/*

 */
export default withStyles(styles)(ReadMyVoice)
