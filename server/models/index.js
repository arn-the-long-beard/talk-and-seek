const mongoose = require('mongoose')

module.exports.connect = (uri) => {
  mongoose.connect(uri)
  // plug in the promise library:
  mongoose.Promise = global.Promise
  var Schema = mongoose.Schema
  const GFS = mongoose.model('GFS', new Schema({}, {strict: false}), 'fs.files')
  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`)
    process.exit(1)
  })

  // load models
  require('./user')
  require('./group')
  require('./university')
  require('./chatmessages')
}
