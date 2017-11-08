
const Group = require('mongoose').model('Group')
const University = require('mongoose').model('University')
const MemberStatus = require('mongoose').model('MemberStatus')
/**
 *  The Auth Checker middleware function.
 *
 *  Check if the room is the right group
 *
 */
module.exports = (socket, group_id, university_id, next) => {
  console.log('SOCKET CHECK -----------------CHECKING GROUP AND UNIV ')
  University.findById(university_id, (err, uni) => {
    if (err) {
      console.log(err)
      return err
    }

    if (!uni) {
      console.log('no uni')
      return new Error('no uni')
    }
    if (uni.groups.find(grId => { return grId === group_id }) === false) {
      console.log('wrong room')
    }
    console.log(uni)
  /*    var selectedgroup = uni.groups[0]

      if (group_id !== selectedgroup._id) {
        console.log('wrong room')
        return new Error('Wrong room')
      } */
    MemberStatus.findOne({user_id: socket.user._id, group_id: group_id}, function (err, mmstatus) {
      if (err) {
        console.log('status member not found')
        return err
      }
      if (!mmstatus) return null
      Group.findById(group_id, function (err, group) {
        if (err) return err
        if (group.status !== 'Staff') { return new Error('Wrong room') } else {
          console.log('SOCKET CHECK -----------------the user is a member of the room ')
          console.log('--------------------------------')
          return next(true)
        }
      })
    })
  })
}
