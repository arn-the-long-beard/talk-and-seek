import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'

import Linkedin from '../../ThirdParty/Linkedin/LinkedinAuth'
import Google from '../../ThirdParty/Google/GoogleAuth'
import Facebook from '../../ThirdParty/Facebook/FacebookAuth'
/*
  <div>
        <LinkedIn
          clientId='7863emate4s9z1'
          callback={handleResponse}
          className={[styles.loginBtn, styles.loginBtnlinkedin].join(' ')}
          text='Sign in With LinkedIn' />
      </div>

         <div><button className={[styles.loginBtn, styles.loginBtngoogle].join(' ')}>Sign in With Google</button></div>
              <div><button className={[styles.loginBtn, styles.loginBtnfacebook].join(' ')}>Sign in With Facebook</button></div>
 */
const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
credentials, isValid, handleResponse}) => (
  <Card >
    <div className={styles.form}>
      <Facebook />
      <Linkedin />
      <Google />
      <form action='/' onSubmit={onSubmit} method='post'>
        <h2 className={styles.label}>Or</h2>
        {errors.summary && <p className='error-message'>{errors.summary}</p>}
        <div>
          <TextField className={styles.textField}
            id='firstnamesignup'
            hintText='First Name'
            name='firstname'
            errorText={errors.firstname}
            onChange={onChange}
            value={credentials.firstname}
            underlineStyle={{width: 'calc(100% - 15px)'}}
        />
        </div>
        <div>
          <TextField className={styles.textField}
            id='famillynamesignup'
            hintText='Last Name'
            name='famillyname'
            errorText={errors.famillyname}
            onChange={onChange}
            value={credentials.famillyname}
            underlineStyle={{width: 'calc(100% - 15px)'}}
        />
        </div>
        <div>
          <TextField className={styles.textField}
            id='emailsignup'
            hintText='Email'
            name='email'
            errorText={errors.email}
            onChange={onChange}
            value={credentials.email}
            underlineStyle={{width: 'calc(100% - 15px)'}}
        />
        </div>
        <div>
          <TextField className={styles.textField}
            id='passwordsignup'
            hintText='Password'
            type='password'
            name='password'
            onChange={onChange}
            errorText={errors.password}
            value={credentials.password}
            underlineStyle={{width: 'calc(100% - 15px)'}}
        />
        </div>
        <div>
          <TextField className={styles.textField}
            id='passwordsignup2'
            hintText='Repeat your password'
            type='password'
            name='password_repeat'
            onChange={onChange}
            errorText={errors.password}
            value={credentials.password_repeat}
            underlineStyle={{width: 'calc(100% - 15px)'}}
          />
        </div>
        <div>
          < button className={styles.button} disabled={!isValid} label='Sign up' type='submit' >Sign up</button>

        </div>
      </form>
    </div>
  </Card>
)
//  <RaisedButton  />
SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired
}

SignUpForm.contextTypes = {
  insertCss: PropTypes.func
}

export default withStyles(styles)(SignUpForm)
