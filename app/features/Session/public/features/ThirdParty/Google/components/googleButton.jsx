
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from '../styles/styles.scss'
import PropTypes from 'prop-types'
import Loader from '../../../../../../../components/Spinner/miniLoader'
import GoogleLogin from 'react-google-login'
const GoogleButton = ({onSuccess, onFailure}) => (
  <div>
    <GoogleLogin
      clientId='807620094523-opp0gld59nfj7di0j92icph8f2ungl79.apps.googleusercontent.com'
      buttonText='Sign in With Google'
      className={[styles.loginBtn, styles.loginBtngoogle].join(' ')}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  </div>
)
GoogleButton.contextTypes = {
  insertCss: PropTypes.func
}

export default withStyles(styles)(GoogleButton)
//    <button type='button' disabled={disabled} className={[styles.loginBtn, styles.loginBtngoogle].join(' ')} onClick={continueWithGoogle}><div className={styles.labelButton}>Sign in With Google</div> <div className={styles.labelButton}> {onLoad &&
// <Loader />} </div></button>
