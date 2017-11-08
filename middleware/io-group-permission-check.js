
const User = require('mongoose').model('User')
const Group = require('mongoose').model('Group')
const University = require('mongoose').model('University')
const MemberStatus = require('mongoose').model('MemberStatus')

/**
 *  The Auth Checker middleware function.
 *
 *  Check if the group is admin
 *
 */

module.exports = (socket, group_id, university_id, next) => {
  console.log('SOCKET CHECK -----------------CHECKING GROUP AND UNIV ')
  University.findById(university_id)
    .populate({
      path: 'groups',
      match: {status: { $eq: 'Staff' }}
    })
    .exec(function (err, uni) {
      if (err) return err
      console.log(uni)
      var adminGroup = uni.groups[0]

      if (group_id !== adminGroup._id) {
        return new Error('Wrong room')
      }
      MemberStatus.findOne({user_id: res.locals.user._id, group_id: adminGroup._id}, function (err, mmstatus) {
        if (err) {
          console.log('status member not found')
          return err
        }
        if (!mmstatus) return null
        Group.findById(adminGroup._id, function (err, group) {
          if (err) return err
          if (group.status !== 'Staff') { return new Error('Wrong room') } else {
            console.log('SOCKET CHECK -----------------the user is a member of the staff ')
            console.log('--------------------------------')
            return next(true)
          }
        })
      })
    })
}
