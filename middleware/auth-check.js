const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const config = require('../../config')

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
      err: 'Unauthorized'
    })
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1]
  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      console.log(err)

      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        err: err
      })
    }

    const userId = decoded._id

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
          err: userErr
        })
      }
      console.log('token thing works fine')
      res.locals.user = user
      return next()
    })
  })
}
