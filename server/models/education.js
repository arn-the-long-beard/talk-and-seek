const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
mongoose.Promise = Promise

const Education = new Schema({
  main_grade: {type: String, trim: true},
  awards: {type: String, trim: true},
  honors: {type: String, trim: true},
  grade: {type: String, trim: true},
  from: {type: Date, isRequired: true},
  to: {type: Date, isRequired: true},
  program: {
    status: {
      type: String,
      enum: ['Program', 'ProgramNotFound']
    },
    program_id: {type: Schema.Types.ObjectId, refPath: 'program.status'}
  },
  degree: {
    level: {
      type: String,
      enum: ['Bachelor', 'Master', 'PHD']
    },
    degree_id: { type: Schema.Types.ObjectId, refPath: 'degree.status' }
  },
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  updated_a: Date,
  created_at: Date
})

Education.pre('save', function saveHook (next) {
  var now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = mongoose.model('Education', Education)
