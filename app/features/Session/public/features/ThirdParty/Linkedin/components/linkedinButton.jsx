
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'
import PropTypes from 'prop-types'
import LinkedIn from '../lib/index'
import Loader from '../../../../../../../components/Spinner/miniLoader'
const LinkedinButton = ({continueWithLinkedin, disabled, onLoad}) => (
  <div><button type='button' disabled={disabled} className={[styles.loginBtn, styles.loginBtnlinkedin].join(' ')} onClick={continueWithLinkedin}><div className={styles.labelButton}>Sign in With LinkedIn</div> <div className={styles.labelButton}> {onLoad &&
  <Loader />} </div></button></div>

)
LinkedinButton.contextTypes = {
  insertCss: PropTypes.func
}
/*
  <div><button type='button' disabled={disabled} className={[styles.loginBtn, styles.loginBtnlinkedin].join(' ')} onClick={continueWithLinkedin}><div className={styles.labelButton}>Sign in With LinkedIn</div> <div className={styles.labelButton}> {onLoad &&
  <Loader />} </div></button></div>



    <LinkedIn
    clientId='7863emate4s9z1'
    callback={continueWithLinkedin}
    className={[styles.loginBtn, styles.loginBtnlinkedin].join(' ')}
    scope='r_basicprofile'
    text='LinkedIn' />
 */
export default withStyles(styles)(LinkedinButton)
