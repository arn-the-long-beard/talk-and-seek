const mongoose = require('mongoose')
const Memberstatus = require('../models/memberstatus')
var Schema = mongoose.Schema
var Promise = require('bluebird')
mongoose.Promise = Promise

const Address = new Schema({
  street: { type: String, required: true, trim: true },
  number: {
    type: Number
  },
  City: { type: String, required: true, trim: true },
  PostalCode: { type: Number, required: true, trim: true },
  Country: { type: String, required: true, trim: true },
  Extra: String,
  updated_a: Date,
  created_at: Date
})

Address.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})
Address.index({city: 'text', Country: 'text'})
module.exports = mongoose.model('Address', Address)
