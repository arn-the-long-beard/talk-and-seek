const mongoose = require('mongoose')
const Memberstatus = require('../models/memberstatus')
const User = require('../models/user')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

const Group = new Schema({
  name: { type: String, required: true, trim: true, index: { unique: true } },
  status: {
    type: String,
    enum: ['Staff', 'Alumni', 'Employees', 'Partner', 'Ex-employes', 'Custom', 'Students']
  },
  description: { type: String, trim: true },
  updated_a: Date,
  university_id: {type: Schema.Types.ObjectId, ref: 'University'},
  members: [{type: Schema.Types.ObjectId, ref: 'MemberStatus'}]
})
/**
 * The pre-save hook method.
 */
Group.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

Group.methods.addAdmin = function addAdmin (memberstatus, next) {
  console.log('savin the status inside the group')

  this.members.push(memberstatus)
  this.save(function (err, gr) {
    if (err) {
      console.log(err)
   //   return  next(err)
    }
    return next(err, gr)
  })
}

Group.methods.addMember = function addMember (memberstatus, next) {
  console.log('savin the status member inside the group')

  this.members.push(memberstatus)
  this.save(function (err, gr) {
    if (err) {
      console.log(err)
   //   return  next(err)
    }
    return next(err, gr)
  })
}
Group.methods.removeMember = function removeMember (memberstatus, next) {
  console.log('savin the status member inside the group')

  if (memberstatus.status === 'Admin') return next(new Error('cannot remove admin'), null)

  this.members.remove(memberstatus)
  this.save(function (err, gr) {
    if (err) {
      console.log(err)
    }
    return next(err, gr)
  })
}
// when a group is delete, delete all the member status
Group.pre('remove', function (next) {
  console.log('remove the status before removing the group')
  Memberstatus.find({group_id: this._id}, function (err, memberstatus) {
    if (err) {
      console.log(err)
      return err
    }
    console.log(memberstatus)
    memberstatus.forEach(function (mm) {
      mm.remove(function (err) {
        if (err) {
          console.log(err)
          return err
        }
        console.log('remove' + mm)
      })
    })
  })
  next()
})

Group.methods.createCustomGroup = function createCustomGroup (user, next) {

}

Group.methods.createGroup = function createGroup (user, next) {
    // save the new group
  this.save(function (err, group) {
    console.log('savin the group')
    if (err) {
      console.log(err)
      return err
    }
      // create the status
    var newMemberStatus = new Memberstatus({ status: 'Admin', user_id: user.id, group_id: group.id })
    newMemberStatus.save(function (err, memberstatus) {
      console.log('savin the status')
      if (err) {
        return err
      }
    // add the reference in the userfield members of
      user.beAdmin(memberstatus, function (err) {
        if (err) {
          return err
        }
      // add the reference inside the group
        group.addAdmin(memberstatus, function (err, gr) {
          if (err) {
            return err
          }
          next()
        })
      })
    })
  })
}
// Add guest ?
// change status in group
Group.index({name: 'text'})
module.exports = mongoose.model('Group', Group)
