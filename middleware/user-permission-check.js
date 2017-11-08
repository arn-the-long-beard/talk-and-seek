
const User = require('mongoose').model('User')
const Group = require('mongoose').model('Group')
const MemberStatus = require('mongoose').model('MemberStatus')

/**
 *  The User permissionr middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }
  console.log('Check the user Permission')
  console.log('--------------------------------')
  MemberStatus.findOne({user_id: res.locals.user._id, group_id: req.params.id}, function (err, mmstatus) {
    if (err) {
      console.log('status member not found')
      return res.status(403).json({
        success: false,
        message: 'wrong permission'
      })
    }
    if (!mmstatus) {
      console.log('groupid ' + req.params.id)
      console.log('userid ' + res.locals.user._id)
      return res.status(403).json({
        success: false,
        message: 'wrong permission'
      })
    //  console.log(req)
    }
    if (mmstatus.status !== 'Admin') {
      console.log('the user is not admin but ' + mmstatus.status)
      return res.status(403).json({
        success: false,
        message: 'wrong permission'
      })
    } else {
      console.log('the user is Admin, everything is fine ')
      console.log('--------------------------------')
      return next()
    }
  })
}
