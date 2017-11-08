const express = require('express')
const validator = require('validator')
const passport = require('passport')
const authCheck = require('../middleware/auth-check')
const checkError = require('../middleware/error')
// const passportLinkedIn = require('../auth/linkedin')
// const passportLinkedIn = require('../passport/linkedin')
const router = new express.Router()
const User = require('../models/user')
const Account = require('../models/account')
const jwt = require('jsonwebtoken')
const config = require('../../config')
/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */

function validateSignupForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide a correct email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false
    errors.password = 'Password must have at least 8 characters.'
  }

  if (!payload || typeof payload.firstname !== 'string' || payload.firstname.trim().length === 0) {
    isFormValid = false
    errors.firstname = 'Please provide your first name.'
  }
  if (!payload || typeof payload.famillyname !== 'string' || payload.famillyname.trim().length === 0) {
    isFormValid = false
    errors.famillyname = 'Please provide your familly name.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false
    errors.email = 'Please provide your email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.get('/authlogin', authCheck, function (req, res, next) {
  'use strict'

  let cookieToken = req.cookies['token']
  jwt.verify(cookieToken, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      console.log(err)

      return res.status(401).end()
    }
    const userId = decoded._id
    User.findById(userId).populate({
      path: 'member_of',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'group_id', populate: {path: 'university_id'} } })
      .populate('files')
      .exec(function (err, user) {
        //   console.log(mygroup)
        if (err) {
          return res.status(409).json({
            success: false,
            err: err,
            message: 'error on getting the user'
          })
        }
        return res.status(200).json({
          success: true,
          message: 'You have your complete information',
          user: user,
          token: cookieToken
        })
      })
  })
})
router.post('/login', function (req, res, next) {
  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      err: validationResult.errors
    })
  }
  passport.authenticate('local', function (err, user, info) {
    console.log(err)
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
        err: err
      })
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect email or password',
        err: { summary: 'no user found'}
      })
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
          err: { summary: 'no user found'}
        })
      }

      // TODO maybe improve adn also change into the middwaleres
      const payload = {
        familly_name: user.familly_name,
        first_name: user.first_name,
        _id: user._id
      }
      // create token string
      const token = jwt.sign(payload, config.jwtSecret, {expiresIn: 60 * 60 * 24})
      // Populate fields

      User.findById(user._id).populate({
        path: 'member_of',
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'group_id', populate: {path: 'university_id'} } })
        .populate('files')
        .exec(function (err, user) {
          //   console.log(mygroup)
          if (err) {
            return res.status(409).json({
              success: false,
              err: err,
              message: 'error on getting the user'
            })
          }
          return res.status(200).json({
            success: true,
            message: 'You have your complete information',
            user: user,
            token: token
          })
        })
    })
  })(req, res, next)
})
// register email
router.post('/signup', function (req, res) {
  console.log('pass:' + req.body.password)
  console.log('email:' + req.body.email)
  const validationResult = validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      err: validationResult.errors
    })
  }
  User.register(new User({ first_name: req.body.firstname, familly_name: req.body.famillyname, email: req.body.email.trim() }), req.body.password.trim(), function (err, account) {
    if (err) {
      console.log('Error ' + err.code)
      console.log(err)
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          err: {
            email: 'This email is already taken.'
          }
        })
      }
      return res.status(409).json({
        success: false,
        message: 'An error occured.'
      })
    }
    // TODO
  // send email verification

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    })
  })
})

router.post('/continueWithlinkedIn', function (req, res) {


  Account.findOne({'id': req.body.id, 'email': req.body.emailAddress, 'provider': 'linkedin' }, (err, acc) => {
    'use strict'
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'An error occured.'
      })
    }
    if (acc) {
      User.findOne({'email': acc.email, '_id': acc.user_id}, (err, linkedUser) => {
        if (err) {
          return res.status(409).json({
            success: false,
            message: 'An error occured.'
          })
        }
        const payload = {
          familly_name: linkedUser.familly_name,
          first_name: linkedUser.first_name,
          _id: linkedUser._id
        }
    // create token string
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: 60 * 60 * 24})
        return res.status(200).json({
          success: true,
          message: 'You have your complete information',
          user: linkedUser,
          token: token
        })
      })
    } else {
      User.findOne({'email': req.body.emailAddress}, (err, existingUser) => {
        if (err) {
          return res.status(409).json({
            success: false,
            message: 'An error occured.'
          })
        }
        if (existingUser) {
          return res.status(200).json({
            success: true,
            code: 303,
            message: 'You already have an account, please loginin to link both accounts'
          })
        } else {
          let account = new Account({ provider: 'linkedin', id: req.body.id, email: req.body.emailAddress})
          account.save((err, newAccount) => {
            checkError(res, err, newAccount, () => {
              let newUser = new User({first_name: req.body.firstName, familly_name: req.body.lastName, email: req.body.emailAddress})
              newUser.save((err, user) => {
                checkError(res, err, user, () => {
                  user.accounts = []
                  user.accounts.push(newAccount)
                  user.save((err, usr) => {
                    checkError(res, err, usr, () => {
                      newAccount.user_id = user
                      newAccount.save((err, newAcc) => {
                        checkError(res, err, newAcc, () => {
                          const payload = {
                            familly_name: user.familly_name,
                            first_name: user.first_name,
                            _id: user._id
                          }
              // create token string
                          const token = jwt.sign(payload, config.jwtSecret, {expiresIn: 60 * 60 * 24})
                          return res.status(200).json({
                            success: true,
                            message: 'You have your complete information',
                            user: user,
                            token: token
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        }
      })
    }
  })
})
router.post('/continueWithGoogle', function (req, res) {
  const GoogleAuth = require('google-auth-library')
  let auth = new GoogleAuth()
  let client = new auth.OAuth2('807620094523-opp0gld59nfj7di0j92icph8f2ungl79.apps.googleusercontent.com', '', '')
  client.verifyIdToken(
    req.body.tokenId,
    '807620094523-opp0gld59nfj7di0j92icph8f2ungl79.apps.googleusercontent.com',
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
    (e, login) => {
      let payload = login.getPayload()
      let userid = payload['sub']
      // If request specified a G Suite domain:
      let domain = payload['hd']
      let email = payload['email']
      let verified = payload['mail_verified']
      let famillyName = payload['family_name']
      let firstName = payload['given_name']

      if (verified === false) {
        return res.status(401).json({
          success: false,
          message: 'please verify your google account',
          err: { summary: 'no verified email'}
        })
      } else {
        Account.findOne({'id': userid, 'email': email, 'provider': 'google' }, (err, acc) => {
          'use strict'
          if (err) {
            return res.status(409).json({
              success: false,
              message: 'An error occured.'
            })
          }
          if (acc) {
            User.findOne({'email': acc.email, '_id': acc.user_id}, (err, googleUser) => {
              if (err) {
                return res.status(409).json({
                  success: false,
                  message: 'An error occured.'
                })
              }
              const payload = {
                familly_name: googleUser.familly_name,
                first_name: googleUser.first_name,
                _id: googleUser._id
              }
            // create token string
              const token = jwt.sign(payload, config.jwtSecret, {expiresIn: 60 * 60 * 24})
              return res.status(200).json({
                success: true,
                message: 'You have your complete information',
                user: googleUser,
                token: token
              })
            })
          } else {
            User.findOne({'email': email}, (err, existingUser) => {
              if (err) {
                return res.status(409).json({
                  success: false,
                  message: 'An error occured.'
                })
              }
              if (existingUser) {
                return res.status(200).json({
                  success: true,
                  code: 303,
                  message: 'You already have an account, please loginin to link both accounts'
                })
              } else {
                let account = new Account({ provider: 'google', id: userid, email: email})
                account.save((err, newAccount) => {
                  checkError(res, err, newAccount, () => {
                    let newUser = new User({first_name: firstName, familly_name: famillyName, email: email})
                    newUser.save((err, user) => {
                      checkError(res, err, user, () => {
                        user.accounts = []
                        user.accounts.push(newAccount)
                        user.save((err, usr) => {
                          checkError(res, err, usr, () => {
                            newAccount.user_id = user
                            newAccount.save((err, newAcc) => {
                              checkError(res, err, newAcc, () => {
                                const payload = {
                                  familly_name: user.familly_name,
                                  first_name: user.first_name,
                                  _id: user._id
                                }
                              // create token string
                                const token = jwt.sign(payload, config.jwtSecret, {expiresIn: 60 * 60 * 24})
                                return res.status(200).json({
                                  success: true,
                                  message: 'You have your complete information',
                                  user: user,
                                  token: token
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              }
            })
          }
        })
      }
    }
)
})

router.post('/continueWithFacebook', function (req, res) {
  // const GoogleAuth = require('google-auth-library')
  // let auth = new GoogleAuth()
  // let client = new auth.OAuth2('807620094523-opp0gld59nfj7di0j92icph8f2ungl79.apps.googleusercontent.com', '', '')
  // client.verifyIdToken(
  //   req.body.tokenId,
  //   '807620094523-opp0gld59nfj7di0j92icph8f2ungl79.apps.googleusercontent.com',
  //   // Or, if multiple clients access the backend:
  //   // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
  //   (e, login) => {
  //     let payload = login.getPayload()
  //     let userid = payload['sub']
  //     // If request specified a G Suite domain:
  //     let domain = payload['hd']
  //     let email = payload['email']
  //     let verified = payload['mail_verified']
  //     let famillyName = payload['family_name']
  //     let firstName = payload['given_name']
  //
  //     if (verified === false) {
  //       return res.status(401).json({
  //         success: false,
  //         message: 'please verify your google account',
  //         err: { summary: 'no verified email'}
  //       })
  //     } else {
  //       Account.findOne({'id': userid, 'email': email, 'provider': 'google' }, (err, acc) => {
  //         'use strict'
  //         if (err) {
  //           return res.status(409).json({
  //             success: false,
  //             message: 'An error occured.'
  //           })
  //         }
  //         if (acc) {
  //           User.findOne({'email': acc.email, '_id': acc.user_id}, (err, googleUser) => {
  //             if (err) {
  //               return res.status(409).json({
  //                 success: false,
  //                 message: 'An error occured.'
  //               })
  //             }
  //             const payload = {
  //               familly_name: googleUser.familly_name,
  //               first_name: googleUser.first_name,
  //               _id: googleUser._id
  //             }
  //             // create token string
  //             const token = jwt.sign(payload, config.jwtSecret, {expiresIn: 60 * 60 * 24})
  //             return res.status(200).json({
  //               success: true,
  //               message: 'You have your complete information',
  //               user: googleUser,
  //               token: token
  //             })
  //           })
  //         } else {
  //           User.findOne({'email': email}, (err, existingUser) => {
  //             if (err) {
  //               return res.status(409).json({
  //                 success: false,
  //                 message: 'An error occured.'
  //               })
  //             }
  //             if (existingUser) {
  //               return res.status(200).json({
  //                 success: true,
  //                 code: 303,
  //                 message: 'You already have an account, please loginin to link both accounts'
  //               })
  //             } else {
  //               let account = new Account({ provider: 'google', id: userid, email: email})
  //               account.save((err, newAccount) => {
  //                 checkError(res, err, newAccount, () => {
  //                   let newUser = new User({first_name: firstName, familly_name: famillyName, email: email})
  //                   newUser.save((err, user) => {
  //                     checkError(res, err, user, () => {
  //                       user.accounts = []
  //                       user.accounts.push(newAccount)
  //                       user.save((err, usr) => {
  //                         checkError(res, err, usr, () => {
  //                           newAccount.user_id = user
  //                           newAccount.save((err, newAcc) => {
  //                             checkError(res, err, newAcc, () => {
  //                               const payload = {
  //                                 familly_name: user.familly_name,
  //                                 first_name: user.first_name,
  //                                 _id: user._id
  //                               }
  //                               // create token string
  //                               const token = jwt.sign(payload, config.jwtSecret, {expiresIn: 60 * 60 * 24})
  //                               return res.status(200).json({
  //                                 success: true,
  //                                 message: 'You have your complete information',
  //                                 user: user,
  //                                 token: token
  //                               })
  //                             })
  //                           })
  //                         })
  //                       })
  //                     })
  //                   })
  //                 })
  //               })
  //             }
  //           })
  //         }
  //       })
  //     }
  //   }
  // )
})
//
//   jwt.verify(req.body.tokenId, config.google, (err, decoded) => {
//     // the 401 code is for unauthorized status
//     if (err) {
//       console.log(err)
//
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized',
//         err: err
//       })
//     }
//     const userId = decoded._id
//
//     // check if a user exists
//     return User.findById(userId, (userErr, user) => {
//       if (userErr || !user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Unauthorized',
//           err: userErr
//         })
//       }
//       console.log('token thing works fine')
//       res.locals.user = user
//     })
//   })
// })

// router.post('*', (req, res, next) => {
//   console.log('auth failed page does not exist')
//   return res.status(400).json({
//     success: false,
//     message: 'this page does not exist'
//   })
// })
// router.get('*', (req, res, next) => {
//   console.log('auth failed page does not exist')
//   return res.status(400).json({
//     success: false,
//     message: 'this page does not exist'
//   })
// })
module.exports = router
