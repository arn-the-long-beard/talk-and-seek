
const express = require('express')
const router = new express.Router()
const path = require('path')
const speech = require('@google-cloud/speech')
const fs = require('fs')
const multer = require('multer')
// Your Google Cloud Platform project ID
const projectId = 'talk-and-seek-1510136935941'
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')
const cleanString = require('../lib/stringUtility').cleanString
const conn = mongoose.connection
Grid.mongo = mongoose.mongo
const gfs = Grid(conn.db)
// Creates a client
const client = new speech.SpeechClient({
  projectId: projectId
})

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './uploads')
  },
  filename: function (request, file, callback) {
    console.log(file)
    callback(null, cleanString(file.originalname + '.flac'))
  }
})

var upload = multer({storage: storage, dest: './uploads'})

router.get('/dashboard', (req, res) => {
  console.log('Auth to API works good')
  res.status(200).json({
    success: true,
    message: "You're authorized to see this secret message."
  })
})

// const fileName = path.join(__dirname, 'resources', 'audio.raw')
//
// // Reads a local audio file and converts it to base64
// const file = fs.readFileSync(fileName)
// const audioBytes = file.toString('base64')
// const audio = {
//   content: audioBytes
// }
// const config = {
//   encoding: 'LINEAR16',
//   sampleRateHertz: 16000,
//   languageCode: 'en-US'
// }
// const request = {
//   audio: audio,
//   config: config
// }
//
const fileName = path.join(__dirname, 'resources', 'output.flac')
const file = fs.readFileSync(fileName)
const audioBytes = file.toString('base64')
// Reads a local audio file and converts it to base64

//  ss(socket).emit('file-uploaded',     base64,file);

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
  content: audioBytes
}
const config = {
  encoding: 'FLAC',
  languageCode: 'fr-FR'
}
const request = {
  audio: audio,
  config: config
}
client
  .recognize(request)
  .then(data => {
    const response = data[0]
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n')
    console.log(`Transcription: ${transcription}`)
  })
  .catch(err => {
    console.error('ERROR:', err)
    console.log(err)
  })

router.post('/seek', (req, res) => {
  console.log(req.body.data)
  return res.status(200).json({message: ' file  uploaded', success: true, text: req.body.data})
})
router.post('/talk', upload.single('file'), (req, res) => {
  let cleanFileName = cleanString(req.file.originalname) + '.flac'
  let stringFilePath = './uploads/' + cleanFileName
  saveGFS(cleanFileName, stringFilePath, res, req.file.mimetype, (err, file) => {
    if (err || !file) {
      console.log(err)
      return res.status(409).json({message: 'error file uploaded', success: false, err: err})
    }
// send to google

    const readstream = gfs.createReadStream({
      _id: file._id
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
      const fbuf = Buffer.concat(bufs)
      const audioBytes = fbuf.toString('base64')

   // const fileName = stringFilePath
  //  const fileName  = path.join(__dirname, 'resources', 'output.flac')
  //   const file = fs.readFileSync(fileName)
   // const audioBytes = file.toString('base64')
// Reads a local audio file and converts it to base64

        //  ss(socket).emit('file-uploaded',     base64,file);

        // The audio file's encoding, sample rate in hertz, and BCP-47 language code
      const audio = {
        content: audioBytes
      }
      const config = {
        encoding: 'FLAC',
        languageCode: 'fr-FR',
        sampleRateHertz: 44100
      }
      const request = {
        audio: audio,
        config: config
      }
      client
          .recognize(request)
          .then(data => {
            const response = data[0]
            const transcription = response.results
              .map(result => result.alternatives[0].transcript)
              .join('\n')
            console.log(`Transcription: ${transcription}`)
            return res.status(200).json({message: ' file  uploaded', success: true, text: transcription})
          })
          .catch(err => {
            console.error('ERROR:', err)
            console.log(err)
            return res.status(409).json({message: 'error file uploaded', success: false, err: err})
          })
    })
  })
})

function saveGFS (fileName, completePath, res, mimeType, next) {
  var writestream = gfs.createWriteStream({
    filename: fileName,
    content_type: mimeType
  })

  fs.createReadStream(completePath).pipe(writestream)
    .on('close', function (file) {
      fs.unlink(completePath, function (err) {
        if (err) {
          console.log(err)
          console.log('delete the file')
          return next(err, null)
        }

        console.log('Succees upload file' + file._id)
        gfs.findOne({ _id: file._id}, function (err, file) {
          console.log(file)
          if (err) {
            return next(err, null)
            //      return res.status(409).json({ message: 'error  file e uploaded', success: false, err: err})
          }
          if (file) {
            return next(null, file)
            //    return res.status(200).json({ message: ' file  uploaded', success: true, file: file})
          }
        })
      })
    })
    .on('error', function (err) { console.log('error' + err) })
}
module.exports = router
