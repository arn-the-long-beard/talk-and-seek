const mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise
const User = require('../models/user')
const MemberStatus = new Schema({
  status: {
    type: String,
    enum: ['Admin', 'Member', 'Guest']
  },
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  group_id: {type: Schema.Types.ObjectId, ref: 'Group'},
  created_at: Date,
  updated_at: Date
})
/**
 * The pre-save hook method.
 */
MemberStatus.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

MemberStatus.pre('remove', function (next) {
  console.log('going to remove the member status, so do we need to remove the status from users')
  console.log(this._id)
  let id = this._id
  User.find({_id: this.user_id}, function (err, users) {
    if (err) {
      console.log(err)
      return err
    }
    users.forEach(function (user) {
      user.quitGroup(id, function (err) {
        if (err) return err
      })
    })
  })
  next()
})

module.exports = mongoose.model('MemberStatus', MemberStatus)
