
module.exports = (io) => {
  const mongoose = require('mongoose')
  const ss = require('socket.io-stream')
  const ent = require('ent') // security on the string user can write)
  const Grid = require('gridfs-stream')
  Grid.mongo = mongoose.mongo
  let gfs
  const University = require('mongoose').model('University')
  const Group = require('mongoose').model('Group')
  const ChatMessages = require('mongoose').model('ChatMessages')
  const ioAuthCheck = require('../middleware/io-auth-check')
 // const ioAuthCheck = require('jwt-socket.io')
 // var ioGroupPermissionCheck = require('../middleware/io-group-permission-check')
  const ioRoomCheck = require('../middleware/io-room-check.js')
  mongoose.connection.once('open', function () {
    gfs = Grid(mongoose.connection.db)
  })

  io.use(ioAuthCheck)
    .on('connection', function (socket) {
      console.log('---------------------------Client connected --------------------------.')
      Object.keys(io.sockets.sockets).forEach(function (socket) {
        console.log(socket)
      })
      console.log('NEW user from server on ' + socket.user.familly_name)
      console.log('There are now ' + Object.keys(io.sockets.connected).length + ' connections')

      socket.on('join_room', function (data) {
        let {room} = data
        let {university_id} = data
        console.log('--------------------------- JOIN ROOM' + room.name + ' ---------------------------------')

        ioRoomCheck(socket, room._id, university_id, function (err, res) {
          if (err) return err
          console.log(res)
        })

        console.log(socket.user.familly_name + ' has joined the room')
        socket.join(room._id)
       // socket.broadcast.to(room._id).emit('newUser', socket.user.familly_name + ' has joined the tchat')
        let msg = socket.user.familly_name + ' has joined the tchat'
        socket.broadcast.to(room._id).emit('newUser', {user: socket.user, message: msg })

        console.log('----------------- Load Historic -----------------------')

        ChatMessages.find({'group_id': room._id })
          .sort('-created_at').limit(10)
          .populate({ path: 'user_id', select: { 'familly_name': 1, 'first_name': 1, '_id': 1 }})
          .exec(function (err, messages) {
            if (err) return err
            console.log(messages.length + ' messages')
            if (messages.length === 0) return null

            io.to(socket.id).emit('update', room, messages.reverse())
          })

        socket.in(room._id).on('message', function (message) {
          message = ent.encode(message)
          if (!message) return null
          console.log(socket.user.familly_name + ' said ' + message)
          var date = new Date()
          var dbmessage = new ChatMessages({user_id: socket.user._id, text: message, group_id: room._id, created_at: date })
          dbmessage.save(function (err, newmsg) {
            if (err) { console.log('Error on save!') } else {
              ChatMessages.populate(newmsg, { path: 'user_id', select: { 'familly_name': 1, 'first_name': 1, '_id': 1 }}, function (err, mesg) {
                socket.broadcast.to(room._id).emit('message', mesg)
              })
            }
            ;
          })
        })
        socket.in(room._id).on('disconnect', function () {
          console.log(socket.user.familly_name + 'Got disconnect!---------' + room.name)
          let msg = socket.user.familly_name + ' has letft the tchat'
          socket.broadcast.to(room._id).emit('userQuitted', {userId: socket.user_id, message: msg})
        })
      })
    }).on('error', function () { console.log('error') }).on('disconnect', function () { console.log('disconnected') })
}
