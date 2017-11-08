var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

var ChatMessages = new Schema({
  text: String,
  created_at: Date,
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  group_id: {type: Schema.Types.ObjectId, ref: 'Group'}
})
ChatMessages.pre('save', function (next) {
  var now = new Date()
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})
module.exports = mongoose.model('ChatMessages', ChatMessages)
