
const Group = require('mongoose').model('Group')
const University = require('mongoose').model('University')
const MemberStatus = require('mongoose').model('MemberStatus')

/**
 *  The Auth Checker middleware function.
 *
 *   *  Check if the group is admin
 *
 *
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }
  console.log('-------------------Check the group Permission------------------------------')

  // find the universitySearch admin group
  University.findById(req.params.id)
  .populate({
    path: 'groups',
    match: {status: { $eq: 'Staff' }}
  })
  .exec(function (err, uni) {
    if (err) return err
    console.log(uni)
    var adminGroup = uni.groups[0]
    MemberStatus.findOne({user_id: res.locals.user._id, group_id: adminGroup._id}, function (err, mmstatus) {
      if (err) {
        console.log('status member not found')
        return err
      }
      if (!mmstatus) return new Error('Wrong member')

      Group.findById(adminGroup._id, function (err, group) {
        if (err) return err
        if (group.status !== 'Staff') { return res.status(401).end } else {
          console.log('the user is a member of the staff ')
          console.log('--------------------------------')
          res.locals.group = group
          return next()
        }
      })
    })
  })
}
