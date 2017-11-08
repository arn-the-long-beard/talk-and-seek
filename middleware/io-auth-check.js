const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const config = require('../../config')

/**
 *  The Auth Checker middleware function.
 */
module.exports = (socket, next) => {
  console.log('--------------------------------- Auth io middlware-------------------')
  if (socket.handshake.query && socket.handshake.query.token) {
    console.log('-----------------------------------HANDSHAKE -----------------------------------')
    jwt.verify(socket.handshake.query.token, config.jwtSecret, (err, decoded) => {
      // the 401 code is for unauthorized status
      if (err) {
        console.log('------------------------------------------- ERROR ----------------------------------')
        console.log(err)
        return next(new Error('Authentication error'))
      }

      const userId = decoded._id

      socket.decoded = decoded
      // check if a user exists
      return User.findById(userId, (userErr, user) => {
        if (userErr || !user) {
          console.log('------------------------------------------- ERROR ----------------------------------')
          return next(new Error('Authentication error '))
        }
        console.log(user.familly_name + ' is connected')
        console.log('SOCKET CHECK ----------------token thing works fine')
        socket.user = user
        return next()
      })
    })
  }
  next(new Error('Authentication error'))
}
