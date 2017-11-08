const mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise
const Group = require('../models/group')
// var GFS = mongoose.model('GFS', new Schema({}, {strict: false}), 'fs.files')
const university = new Schema({
  name: {type: String, required: true, trim: true, index: { unique: true }},
  description: {type: String},
  banner: {type: Schema.Types.ObjectId, ref: 'GFS'},
  updated_at: Date,
  created_at: Date,
  values: [{type: Schema.Types.ObjectId, ref: 'Value'}],
  fields: {type: Schema.Types.ObjectId, ref: 'Field'},
  address: {type: Schema.Types.ObjectId, ref: 'Address'},
  groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
})
/**
 * The pre-save hook method.
 */
university.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
  // proceed further only if the password is modified or the user is new
})

university.methods.createUniversity = function createUniversity (user, next) {
  var newStaff = new Group({name: this.name + ' \'s administrators ', status: 'Staff', university_id: this._id})
  var newEmployees = new Group({name: this.name + ' \'s employees ', status: 'Employees', university_id: this._id})
  var newAlumni = new Group({name: this.name + ' \'s Alumni ', status: 'Alumni', university_id: this._id})
  newStaff.createGroup(user, function (err) {
    if (err) { return err }

    newEmployees.createGroup(user, function (err) {
      if (err) return err

      newAlumni.createGroup(user, function (err) {
        if (err) return err
      })
    })
  })
  this.groups.push(newStaff)
  this.groups.push(newEmployees)
  this.groups.push(newAlumni)
  this.save(function (err) {
    if (err) {
      console.log(err)
      return err
    }
  })
  next()
}

university.index({name: 'text'})
module.exports = mongoose.model('University', university)
