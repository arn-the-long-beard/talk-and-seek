var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

var Messages = new Schema({
  text: String,
  created_at: Date,
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  chat_id: {type: Schema.Types.ObjectId, ref: 'Chat'}
})
Messages.pre('save', function (next) {
  var now = new Date()
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})
module.exports = mongoose.model('Messages', Messages)
