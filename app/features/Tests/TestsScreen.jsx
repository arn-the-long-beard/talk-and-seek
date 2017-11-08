import { Helmet } from 'react-helmet'
import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
const TestsScreen = () => (
  <div className={styles.container}>
    <Helmet
      title='Test your device'
    />
    <p className={styles.text}> <div>Device Test!</div>
      <MediaQuery query='(min-device-width: 1224px)'>
        <div>You are a desktop or laptop</div>
        <MediaQuery query='(min-device-width: 1824px)'>
          <div>You also have a huge screen</div>
        </MediaQuery>
        <MediaQuery query='(min-device-height: 1080px)'>
          <div>You also have a Heigh screen</div>
        </MediaQuery>
        <MediaQuery query='(max-height: 902px)'>
          <div>You also have a small screen</div>
        </MediaQuery>
        <MediaQuery query='(max-width: 1224px)'>
          <div>You are sized like a tablet or mobile phone though</div>
        </MediaQuery>
      </MediaQuery>
      <MediaQuery query='(max-device-width: 1224px)'>
        <div>You are a tablet or mobile phone</div>
      </MediaQuery>
      <MediaQuery query='(orientation: portrait)'>
        <div>You are portrait</div>
      </MediaQuery>
      <MediaQuery query='(orientation: landscape)'>
        <div>You are landscape</div>
      </MediaQuery>
      <MediaQuery query='(min-resolution: 2dppx)'>
        <div>You are retina</div>
      </MediaQuery></p>

  </div>
)
TestsScreen.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(TestsScreen)
