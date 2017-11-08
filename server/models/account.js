const mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

const Account = new Schema({
  provider: { type: String, required: true, trim: true },
  id: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  updated_a: Date,
  created_at: Date
})

Account.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = mongoose.model('Account', Account)
