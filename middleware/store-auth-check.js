const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const config = require('../../config')

/**
 *  The Auth Checker middleware function.
 */
// TODO CHANGE THIS

module.exports = (req, res, next) => {
  if (!req.headers.cookie['token']) {
    return next(null)
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.cookies['token']
  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return next(null) }

    const userId = decoded._id

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        })
      }
      console.log('token thing works fine')
    //  res.locals.user = user

      return session = ({logged: true,
        user: user,
        message: 'You have successfully logged in!'})
    })
  })
}
