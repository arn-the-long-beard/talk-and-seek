const mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

const Field = new Schema({
  name: {type: String},
  programs: [{type: Schema.Types.Program}],
  updated_a: Date,
  created_at: Date
})

Field.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = mongoose.model('Field', Field)
