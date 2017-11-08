
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import styles from '../styles/styles.scss'
import PropTypes from 'prop-types'
import FacebookLogin from 'react-facebook-login'
const FacebookButton = ({onSuccess, onFailure}) => (
  <div>
    <FacebookLogin
      appId='1088597931155576'
      autoLoad
      fields='name,email,picture'
      callback={onSuccess}
      cssClass={[styles.loginBtn, styles.loginBtnfacebook].join(' ')}
      // icon='fa-facebook'
    />
  </div>
)
FacebookButton.contextTypes = {
  insertCss: PropTypes.func
}

export default withStyles(styles)(FacebookButton)
//    <button type='button' disabled={disabled} className={[styles.loginBtn, styles.loginBtngoogle].join(' ')} onClick={continueWithGoogle}><div className={styles.labelButton}>Sign in With Google</div> <div className={styles.labelButton}> {onLoad &&
// <Loader />} </div></button>
