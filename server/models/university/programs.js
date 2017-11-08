const mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

const Program = new Schema({
  title: {type: String, required: true, trim: true, index: true},
  description: {type: String, required: true, trim: true},
  bachelor: {type: Schema.Types.ObjectId, ref: 'bachelor'},
  master: {type: Schema.Types.ObjectId, ref: 'Master'},
  dedicated_group: {type: Schema.Types.ObjectId, ref: 'Group'},
  university: {type: Schema.Types.ObjectId, ref: 'University'},
  updated_a: Date,
  created_at: Date
})

Program.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = mongoose.model('Program', Program)
