
const express = require('express')
const Group = require('../models/group')
const User = require('../models/user')
const Memberstatus = require('../models/memberstatus')
const University = require('../models/university')
const router = new express.Router()
const Grid = require('gridfs-stream')

const mongoose = require('mongoose')
const conn = mongoose.connection
Grid.mongo = mongoose.mongo
var gfs = Grid(conn.db)

router.get('/universities', (req, res) => {
  console.log('get the list of universities')

  University.find(function (err, universities) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the universities',
        err: err
      })
    }
    return res.status(200).json({
      success: true,
      message: 'You have got the universities',
      universities: universities
    })
  })
})

// TODO MAKE restriction on it /public/private/ partial content if no account on PF
router.get('/universitySearch/:id', (req, res) => {
  University.findById(req.params.id).populate({
    path: 'field',
    populate: { path: 'programs', populate: {path: 'bachelor'}, populate: {path: 'master'} }})
    .populate({ path: 'groups', populate: {path: 'members', populate: {path: 'user_id'}}})
    .populate('banner')
    .populate('values')
    .exec(function (err, uni) {
      //   console.log(mygroup)
      if (err) {
        return res.status(409).json({
          success: false,
          message: 'error on getting the universitySearch'
        })
      }
      return res.status(200).json({
        success: true,
        message: 'You have got the universitySearch',
        university: uni
      })
    })
})

router.get('/universitySearch/:id/banner', (req, res) => {
  University.findById(req.params.id, function (err, uni) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the universitySearch'
      })
    }
    gfs.findOne({ _id: uni.banner}, function (err, file) {
      console.log(file)
      if (err) {
      }
      if (file) {
        const readstream = gfs.createReadStream({
          _id: uni.banner
        })

        const bufs = []
        readstream.on('data', function (chunk) {
          bufs.push(chunk)
        })
        readstream.on('error', function (err) {
          console.log(err)
          res.send('No image found with that title')
        })

        readstream.on('close', function () {
          /*
          const fbuf = Buffer.concat(bufs)
          const base64 = fbuf.toString('base64')
*//*
          const fbuf = Buffer.concat(bufs)

          var img = new Buffer(fbuf, 'base64')

          res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
          })
          res.end(img) */
        })
        res.type(file.contentType)
        readstream.pipe(res)
      }
    })
  })
})

router.post('/search/universities', (req, res) => {
  University.find({$text: {$search: req.body.text}}, function (err, universities) {
    if (err) {
      return res.status(409).json({
        success: false,
        err: err,
        message: 'error on getting the universitySearch'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'You have got the universitySearch',
      universities: universities
    })
  })
})
router.post('/search/users', (req, res) => {
  User.find({$text: {$search: req.body.text}}, function (err, users) {
    if (err) {
      return res.status(409).json({
        success: false,
        err: err,
        message: 'error on getting the universitySearch'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'You have got the universitySearch',
      users: users
    })
  })
})
module.exports = router
