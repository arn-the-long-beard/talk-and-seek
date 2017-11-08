var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

var Chat = new Schema({
  title: String,
  created_at: Date,
  group_id: {type: Schema.Types.ObjectId, ref: 'Group'},
  messages: [{type: Schema.Types.ObjectId, ref: 'ChatMessages'}]
})
Chat.pre('save', function (next) {
  var now = new Date()
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})
module.exports = mongoose.model('Chat', Chat)
