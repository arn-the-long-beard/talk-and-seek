const mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

var passportLocalMongooseEmail = require('passport-local-mongoose-email')

const User = new Schema({
  first_name: { type: String, required: true, trim: true },
  familly_name: { type: String, required: true, trim: true },
  updated_at: Date,
  created_at: Date,
  member_of: [{type: Schema.Types.ObjectId, ref: 'MemberStatus'}],
  files: [{type: Schema.Types.ObjectId, ref: 'GFS'}],
  curriculum: [{type: Schema.Types.ObjectId, ref: 'Education'}],
  accounts: [{type: Schema.Types.ObjectId, ref: 'Account'}]
})
/**
 * The pre-save hook method.
 */
User.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
  // proceed further only if the password is modified or the user is new
})

User.methods.beAdmin = function (memberstatus, next) {
  this.member_of.push(memberstatus)
  console.log('savin the status inside the user')
  this.save(function (err, usr) {
    if (err) {
      return err
    }
    next()
        //  console.log(thisUser)
  })
}
User.methods.beMember = function (memberstatus, next) {
  this.member_of.push(memberstatus)
  console.log('savin the status inside the user')
  this.save(function (err, usr) {
    if (err) {
      return err
    }
    next()
        //  console.log(thisUser)
  })
}
User.methods.quitGroup = function (memberstatusid, next) {
  console.log('quit group delete the memberstatus')
//  console.log(memberstatusid)
  this.member_of.remove(memberstatusid)
 // console.log(this.member_of)
  this.save(function (err, usr) {
    if (err) {
      console.log(err)
      return err
    }
    console.log(usr)
        //  console.log(thisUser)
    next()
  })
}

User.plugin(passportLocalMongooseEmail, {
  usernameField: 'email'
})

// TODO not working good
User.index({first_name: 'text', familly_name: 'text'})
module.exports = mongoose.model('User', User)
