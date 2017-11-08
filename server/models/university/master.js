const mongoose = require('mongoose')
const Memberstatus = require('../models/memberstatus')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

const Master = new Schema({
  title: {type: String, required: true, trim: true, index: true},
  updated_a: Date,
  created_at: Date
})

Master.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = mongoose.model('Master', Master)
