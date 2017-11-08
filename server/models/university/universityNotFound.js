const mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise
const Group = require('../models/group')
// var GFS = mongoose.model('GFS', new Schema({}, {strict: false}), 'fs.files')
const universityNotFound = new Schema({
  name: {type: String, required: true, trim: true, index: { unique: true }},
  description: {type: String},
  updated_at: Date,
  created_at: Date,
  programs: {type: Schema.Types.ObjectId, ref: 'ProgramNotFound'},
  address: {type: Schema.Types.ObjectId, ref: 'Address'},
  groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
})
/**
 * The pre-save hook method.
 */
universityNotFound.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
  // proceed further only if the password is modified or the user is new
})

universityNotFound.index({name: 'text'})
module.exports = mongoose.model('UniversityNotFound', universityNotFound)
