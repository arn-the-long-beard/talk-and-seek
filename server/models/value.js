const mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

const Value = new Schema({
  key: { type: String, required: true },
  description: {
    type: String, required: true
  },
  university_id: {type: Schema.Types.ObjectId, ref: 'University'},
  updated_a: Date,
  created_at: Date
})

Value.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = mongoose.model('Value', Value)
