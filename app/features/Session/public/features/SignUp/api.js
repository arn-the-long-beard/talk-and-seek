import request from 'superagent'
import ServerAddress from '../../../../Server/ServerAddres'
const validator = require('validator')
const url = () => { return ServerAddress.getServerUrl() }
class SessionApi {
  static signup (credentials) {
    return request.post(url() + '/auth/signup')
      .type('form')
      .send(credentials)
      .then((res, err) => {
        if (err) {
          console.log(err)
        }
        console.log(res.status)
        if (res) {
          return res.body
        }
      })
  }
  static validate (credentials) {
    return new Promise((resolve, reject) => {
      const errors = {}
      let isFormValid = true
      let message = ''

      if (!credentials || typeof credentials.email !== 'string' || !validator.isEmail(credentials.email)) {
        isFormValid = false
        errors.email = 'Please provide a correct email address.'
      }

      if (!credentials || typeof credentials.password !== 'string' || credentials.password.trim().length < 8) {
        isFormValid = false
        errors.password = 'Password must have at least 8 characters.'
      }
      if (!credentials || typeof credentials.password_repeat !== 'string' || credentials.password.trim().length < 8) {
        isFormValid = false
        errors.password = 'Password must have at least 8 characters.'
      }
      if (credentials.password !== credentials.password_repeat) {
        isFormValid = false
        errors.password = 'Passwords not corresponding'
        errors.password_repeat = 'Your repeated the wrong password.'
      }
      if (!credentials || typeof credentials.firstname !== 'string' || credentials.firstname.trim().length === 0) {
        isFormValid = false
        errors.firstname = 'Please provide your first name.'
      }
      if (!credentials || typeof credentials.famillyname !== 'string' || credentials.famillyname.trim().length === 0) {
        isFormValid = false
        errors.famillyname = 'Please provide your last name.'
      }

      if (!isFormValid) {
        message = 'Check the form for errors.'
      }
      resolve({
        success: isFormValid,
        message,
        errors,
        credentials
      })
    })
  }
}

export default SessionApi
