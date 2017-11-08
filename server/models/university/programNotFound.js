const mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

const ProgramNotFound = new Schema({
  name: {type: String, required: true, trim: true, index: true},
  description: {type: String, required: true, trim: true},
  university: {type: String, required: true, trim: true},
  updated_a: Date,
  created_at: Date
})

ProgramNotFound.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = mongoose.model('ProgramNotFound', ProgramNotFound)
