const mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

const Bachelor = new Schema({
  title: {type: String, required: true, trim: true, index: true},
  updated_a: Date,
  created_at: Date
})

Bachelor.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = mongoose.model('Bachelor', Bachelor)
