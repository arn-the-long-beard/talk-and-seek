const express = require('express')
const Group = require('../models/group')
const User = require('../models/user')
const Memberstatus = require('../models/memberstatus')
const University = require('../models/university')
const Value = require('../models/value')
const PDFParser = require('pdf2json')
const router = new express.Router()
const userCheckPermission = require('../middleware/user-permission-check')
const groupCheckPermission = require('../middleware/group-permission-check')
const mongoose = require('mongoose')
const conn = mongoose.connection
const convert = require('../lib/convert')
const StringifyStream = require('stringifystream')
const Grid = require('gridfs-stream')
var multer = require('multer')
var parser = require('xml2json')
const cleanString = require('../lib/stringUtility').cleanString
const newExtension = require('../lib/stringUtility').newExtension
const noExtension = require('../lib/stringUtility').noExtension

const adminRoutes = require('./admin/index')
router.use('/admin', adminRoutes)

Grid.mongo = mongoose.mongo
var gfs = Grid(conn.db)
var fs = require('fs')

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './uploads')
  },
  filename: function (request, file, callback) {
    console.log(file)
    callback(null, cleanString(file.originalname))
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

router.post('/groups/register', (req, res, next) => {
  // console.log(res.locals.user)
  var newGroup = new Group({name: req.body.name, status: 'Custom'})
    // check the user
  User.findById(res.locals.user._id, function (err, user) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on checking the user' + err.code + '  ' + err.name
      })
    }
    // save the new group
    newGroup.createGroup(user, function (err) {
      if (err) {
        return res.status(409).json({
          success: false,
          message: 'error on checking the user' + err.code + '  ' + err.name
        })
      }
      return res.status(200).json({
        success: true,
        message: 'group created',
        group: newGroup
      })
    })
  })
})

router.get('/mygroups', (req, res) => {
      // check the user
  User.findById(res.locals.user._id, function (err, user) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the groups'
      })
    }

    Memberstatus.find({user_id: user._id})
    .populate('group_id').exec(function (err, status) {
      if (err) {
        return res.status(409).json({
          success: false,
          message: 'error on getting the groups'
        })
      }
      let groups = []
      status.forEach(function (mmStatus) {
        groups.push(mmStatus.group_id)
      })
  //    console.log(status)
      return res.status(200).json({
        message: 'You have got the list',
        success: true,
        groups: groups
      })
    })
  })
})

// need to improve the way of deleting with a voting system maybe if many admin
router.delete('/groups/delete/:id', userCheckPermission, (req, res) => {
  console.log('back end delete stuff')
  User.findById(res.locals.user._id, function (err, user) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the groups'
      })
    }
   // console.log(req.params.id)
   // check if the user is admin of this group
    Group.findById(req.params.id, function (err, group) {
      if (err) {
        return res.status(409).json({
          success: false,
          message: err
        })
      }
      if (!group) {
        return res.status(409).json({
          success: false,
          message: 'no groups found'
        })
      }
      group.remove(function (err) {
        if (err) {
          return res.status(409).json({
            success: false,
            message: 'no groups found'
          })
        }
        return res.status(200).json({
          success: true,
          message: 'group deleted',
          groupId: req.params.id
        })
      })
    })
  })
})

router.get('/groups/:id/userstoinvite', userCheckPermission, (req, res) => {
  User.findById(res.locals.user._id, function (err, user) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the groups'
      })
    }

    // get the statusmembers of the group
    Memberstatus.find({group_id: req.params.id}, function (err, mmStatus) {
      if (err) {
        return res.status(409).json({
          success: false,
          message: 'error on getting the users'
        })
      }
      User.find({ member_of: {$nin: mmStatus} }, function (err, users) {
        if (err) {
          return res.status(409).json({
            success: false,
            message: 'error on getting the users'
          })
        }
        return res.status(200).json({
          success: true,
          message: 'You have got the list',
          users: users
        })
      })
    })
  })
})
//
router.put('/groups/:id/addMember', userCheckPermission, (req, res) => {
 // console.log('user id is ' + req.body.user_id)
  User.findById(res.locals.user._id, function (err, admin) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the user'
      })
    }
    Group.findById(req.params.id, function (err, group) {
      if (err) {
        return res.status(409).json({
          success: false,
          message: err
        })
      }

      // check if there is already a status for this user

      Memberstatus.findOne({ user_id: req.body.user_id, group_id: req.params.id}, function (err, mm) {
        if (mm) {
          return res.status(409).json({
            success: false,
            message: ' user already member of the group'
          })
        } else {
      // create the status
          var newMemberStatus = new Memberstatus({ status: 'Member', user_id: req.body.user_id, group_id: group._id })
          User.findById(req.body.user_id, function (err, user) {
            console.log('savin the status')
            if (err) {
              return res.status(409).json({
                success: false,
                message: 'error on saving the member ' + user.first_name + ' err : ' + err.code + '  ' + err.name
              })
            }
            if (!user || user === undefined) {
              return res.status(409).json({
                success: false,
                message: 'user not found'
              })
            }
        // save the status
            newMemberStatus.save(function (err, memberstatus) {
              console.log('savin the status')
              if (err) {
                return res.status(409).json({
                  success: false,
                  message: 'error on saving the member ' + user.first_name + ' err : ' + err.code + '  ' + err.name
                })
              }
          // add the reference in the userfield members of
              user.beMember(memberstatus, function (err) {
                if (err) {
                  console.log(err)
                  return res.status(409).json({
                    success: false,
                    message: 'error on saving group ' + err.code + '  ' + err.name + ' ' + err.message
                  })
                }
            // add the reference inside the group
                group.addMember(memberstatus, function (err, gr) {
                  if (err) {
                    console.log(err)
                    return res.status(409).json({
                      success: false,
                      message: 'error on saving group ' + err.code + '  ' + err.name + ' ' + err.message
                    })
                  }
                  return res.status(200).json({
                    message: 'You have added' + user.familly_name,
                    success: true,
                    group: gr
                  })
                })
              })
            })
          })
        }
      })
    })
  })
})

router.get('/groups/:id/getMembers', (req, res) => {
  User.findById(res.locals.user._id, function (err, admin) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the user'
      })
    }
    Group.findById(req.params.id).populate({
      path: 'members',

      populate: { path: 'user_id', select: { 'familly_name': 1, 'first_name': 1, '_id': 1 } } })
    .exec(function (err, mygroup) {
   //   console.log(mygroup)
      if (err) {
        return res.status(409).json({
          success: false,
          message: 'error on getting the user'
        })
      }
      return res.status(200).json({
        message: 'You have got the members',
        members: mygroup.members,
        success: true
      })
    })
  })
})
router.delete('/groups/:id/removeMember', userCheckPermission, (req, res) => {
  User.findById(res.locals.user._id, function (err, admin) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the user'
      })
    }
    Memberstatus.findById(req.body.status_id, function (err, mmstatus) {
      if (err) {
        return res.status(409).json({
          success: false,
          message: 'error on getting the status member'
        })
      }
      Group.findById(req.params.id, function (err, group) {
        if (err) {
          return res.status(409).json({
            success: false,
            message: 'error on getting group'
          })
        }
        group.removeMember(mmstatus, function (err) {
          if (err) {
            return res.status(409).json({
              success: false,
              message: 'error on deleting memberstatus'
            })
          }
        }
    )
      })

      if (!mmstatus) {
        return res.status(409).json({
          success: false,
          message: 'error on deleting memberstatus'
        })
      }
      mmstatus.remove(function (err) {
        if (err) {
          return res.status(409).json({
            success: false,
            message: 'error on deleting memberstatus'
          })
        }
        return res.status(200).json({
          message: 'You have delete this member',
          success: true,
          memberId: mmstatus._id
        })
      })
    })
  })
})
router.post('/organizations/register', (req, res, next) => {
  var newUniversity = new University({name: req.body.name})
  User.findById(res.locals.user._id, function (err, admin) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the user'
      })
    }
    newUniversity.createUniversity(admin, function (err) {
      if (err) {
        console.log(err)
        return res.status(409).json({
          success: false,
          message: 'error on creating the universitySearch'
        })
      }
      return res.status(200).json({
        success: true,
        message: 'universitySearch created',
        university: newUniversity
      })
    })
  })
})

router.get('/admin/universitySearch/:id/', groupCheckPermission, (req, res) => {
  console.log('welcome on the edit page for universities')
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
    message: 'You have got the universitySearch',
    success: true,
    university: uni
  })
})
})

/*
router.post('/private/myprofile/cv', upload.single('file'), (req, res) => {
  console.log('load the file')

  var writestream = gfs.createWriteStream({
    filename: req.file.originalname,
    content_type: req.file.mimetype,
    metadata: {
      type: 'cv',
      user_id: res.locals.user._id
    }
  })
  fs.createReadStream('./uploads/' + req.file.originalname).pipe(writestream)
    .on('close', function (file) {

      fs.unlink('./uploads/' + req.file.originalname, function (err) {
        if (err) {
          console.log(err)
          console.log('delete the file')
          return res.status(409).json({ message: 'error file uploaded', success: false, err: err})
        }
      })

      console.log('Succees upload file' + file._id)
      // add the reference ti the universitySearch
      User.findById(res.locals.user._id, function (err, user) {
        if(!user.files)
        {  user.files = []}
        user.files.push(file._id)
        user.save(function (err, updatedUser) {
          if (err) {
            console.log(err)
            return res.status(409).json({ message: 'error file  uploaded', success: false, err: err})
          }
          gfs.findOne({ _id: file._id}, function (err, file) {
            console.log(file)
            if (err) {
              return res.status(409).json({ message: 'error  file e uploaded', success: false, err: err})
            }
            if (file) {
              return res.status(200).json({ message: ' file  uploaded', success: true, file: file})
            }
          })
        })
      })
    })
    .on('error', function (err) { console.log('error' + err) })

// first register programms = register also students groups
})
*/

router.post('/private/myprofile/cv', upload.single('file'), (req, res) => {
  console.log('load the file')
  var validator = require('validator')

// TODO Add validator

  var cleanFileName = cleanString(req.file.originalname)
  let stringFilePDFPath = './uploads/' + cleanFileName
  let stringFIleXMLPath = newExtension(stringFilePDFPath, 'xml')
  let newFilename = newExtension(cleanFileName, 'xml')

  convert(stringFilePDFPath, (err, response) => {
    'use strict'
    if (err) {
      return res.status(409).json({ message: 'error when converting the file', success: false, err: err})
    } else {
      saveGFS(cleanFileName, stringFilePDFPath, res, 'application/pdf', (err, file) => {
        if (err) {
          console.log(err)
          return res.status(409).json({ message: 'error file uploaded', success: false, err: err})
        }

        saveGFS(newFilename, stringFIleXMLPath, res, 'text/xml', (err, xmlfile) => {
          if (err) {
            console.log(err)
            return res.status(409).json({ message: 'error file uploaded', success: false, err: err})
          }

          return res.status(200).json({ message: ' file  uploaded', success: true, file: xmlfile})
        })
      })
    }
  })
})

/*

router.post('/private/myprofile/cv', upload.single('file'), (req, res) => {
  console.log('load the file')

  var writestream = gfs.createWriteStream({
    filename: req.file.originalname,
    content_type: 'application/json',
    metadata: {
      type: 'converted document',
      user_id: res.locals.user._id
    }
  })

  fs.createReadStream('./uploads/' + req.file.originalname).pipe(new PDFParser() ).pipe(new StringifyStream()).pipe(writestream)
    .on('close', function (file) {

      //TODO CONVERSION HOO YEAH
      let response =    convert(file)

                  fs.unlink('./uploads/' + req.file.originalname, function (err) {
                    if (err) {
                      console.log(err)
                      console.log('delete the file')
                      return res.status(409).json({ message: 'error file uploaded', success: false, err: err})
                    }
                  })

      console.log('Succees upload file' + file._id)
      // add the reference ti the universitySearch
      User.findById(res.locals.user._id, function (err, user) {
        if(!user.files)
        {  user.files = []}
        user.files.push(file._id)
        user.save(function (err, updatedUser) {
          if (err) {
            console.log(err)
            return res.status(409).json({ message: 'error file  uploaded', success: false, err: err})
          }
          gfs.findOne({ _id: file._id}, function (err, file) {
            console.log(file)
            if (err) {
              return res.status(409).json({ message: 'error  file e uploaded', success: false, err: err})
            }
            if (file) {
              return res.status(200).json({ message: ' file  uploaded', success: true, file: file})
            }
          })
        })
      })
    })
    .on('error', function (err) { console.log('error' + err) })

// first register programms = register also students groups
}) */
router.get('/private/myprofile/cv/:id/', (req, res) => {
  User.findById(res.locals.user._id, function (err, user) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the user'
      })
    }
    gfs.findOne({ _id: req.params.id}, function (err, file) {
      console.log(file)
      if (err) {
      }
      if (file) {
        const readstream = gfs.createReadStream({
          _id: req.params.id
        })

        const bufs = []
        readstream.on('data', function (chunk) {
          bufs.push(chunk)
        })

        readstream.on('error', function (err) {
          console.log(err)
          res.send('Error during the stream')
        })
        readstream.on('close', function () {
        })
        readstream.on('close', function () {

        })

        res.type(file.contentType)
        readstream.pipe(res)
      }
    })
  })
})

/*
router.get('/private/myprofile/cv/:id/xml', (req, res) => {

  let pdfParser = new PDFParser();
  User.findById(res.locals.user._id, function (err, user) {
    if (err) {
      return res.status(409).json({
        success: false,
        message: 'error on getting the user'
      })
    }
    gfs.findOne({ _id: req.params.id}, function (err, file) {
      console.log(file)
      if (err) {
      }
      if (file) {

        let pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
        pdfParser.on("pdfParser_dataReady", pdfData => {
          fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
        });

        pdfParser.loadPDF('./uploads'+file.filename);
      }
  })
})
}) */
router.post('/admin/universitySearch/:id/createProgram', groupCheckPermission, (req, res) => {
  console.log('welcome on the edit page for universities')
})

router.post('/admin/universitySearch/:id/upload', groupCheckPermission, upload.single('file'), (req, res) => {
  console.log('load the file')
  var cleanFileName = cleanString(req.file.originalname)
  // remove the original banner
  University.findById(req.params.id, function (err, uni) {
    gfs.remove({ _id: uni.banner })
  })

  var writestream = gfs.createWriteStream({
    filename: cleanFileName,
    content_type: req.file.mimetype,
    metadata: {
      type: 'banner',
      uni_id: req.params.id,
      user_id: res.locals.user._id
    }
  })

  fs.createReadStream('./uploads/' + cleanFileName).pipe(writestream)
      .on('close', function (file) {
        fs.unlink('./uploads/' + cleanFileName, function (err) {
          if (err) {
            console.log(err)
            console.log('delete the file')

            return res.status(409).json({ message: 'error image uploaded', success: false, err: err})
          }
        })
        console.log('Succees upload file' + file._id)
        // add the reference ti the universitySearch
        University.findById(req.params.id, function (err, uni) {
          uni.banner = file._id
          uni.save(function (err, updatedUni) {
            if (err) {
              console.log(err)
              return res.status(409).json({ message: 'error image uploaded', success: false, err: err})
            }
            gfs.findOne({ _id: file._id}, function (err, file) {
              console.log(file)
              if (err) {
                return res.status(409).json({ message: 'error image uploaded', success: false, err: err})
              }
              if (file) {
                return res.status(200).json({ message: 'image uploaded', success: true, banner: file})
              }
            })
          })
        })
      })
      .on('error', function (err) { console.log('error' + err) })

// first register programms = register also students groups
})
/*
router.get('/banner/admin/universitySearch/:id', (req, res) => {
// TODO improve it
  console.log('--------------get the banner --------------')

  University.findById(req.params.id, function (err, uni) {
   // var readstream = gfs.createReadStream({_id: uni.banner});

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
          const fbuf = Buffer.concat(bufs)
          const base64 = fbuf.toString('base64')
          return res.status(200).json({
            message: 'You have got the image',
            image: base64,
            file: file
          })
               //  ss(socket).emit('file-uploaded',     base64,file);
        })

          //   readstream.pipe(res)
      }
    })
  })
})
*/
router.put('/admin/universitySearch/:id', groupCheckPermission, (req, res) => {
  console.log('You are updating universitySearch')

  University.findById(req.params.id, function (err, uni) {
    uni.description = req.body.info.description
    uni.name = req.body.info.name
    uni.save(function (err, updatedUni) {
      if (err) {
        console.log(err)
        return res.status(409).json({
          success: false,
          message: 'error on getting the universitySearch',
          err: err
        })
      }
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
              err: err,
              message: 'error on getting the universitySearch'
            })
          }
          return res.status(200).json({
            message: 'You have got the universitySearch',
            success: true,
            university: uni
          })
        })
    })
  })
})

router.post('/admin/universitySearch/:id/value', groupCheckPermission, (req, res) => {
  console.log('You are updating your universities value')

  University.findById(req.params.id, function (err, uni) {
    var newValue = new Value({ key: req.body.key, description: req.body.description, university_id: uni._id })
    newValue.save(function (err, value) {
      if (err) {
        console.log(err)
        return res.status(409).json({
          success: false,
          message: 'error on getting the universitySearch',
          err: err
        })
      }
      uni.values.push(value)
      uni.save(function (err, newuni) {
        newuni.populate('values', function (err, uni) {
          if (err) {
            console.log(err)
          }
          return res.status(200).json({
            success: true,
            message: 'You have updated the universitySearch and added your new value',
            values: uni.values
          })
        })
      })
    })
  })
})
router.delete('/admin/universitySearch/:id/value/:key', groupCheckPermission, (req, res) => {
  console.log('You are deleting a value')

  University.findById(req.params.id, function (err, uni) {
    Value.findById(req.params.key, function (err, value) {
      if (err) {
        return res.status(409).json({
          success: false,
          message: err
        })
      }
      if (!value) {
        return res.status(409).json({
          success: false,
          message: 'value found'
        })
      }
      value.remove(function (err) {
        if (err) {
          return res.status(409).json({
            success: false,
            message: 'value found',
            err: err
          })
        }

        uni.values.remove(value)
        uni.save(function (err, newuni) {
          newuni.populate('values', function (err, uni) {
            if (err) {
              console.log(err)
            }
            return res.status(200).json({
              success: true,
              message: 'You have updated the universitySearch and remove value',
              values: uni.values
            })
          })
        })
      })
    })
  })
})

function saveGFS (fileName, completePath, res, mimeType, next) {
  var writestream = gfs.createWriteStream({
    filename: fileName,
    content_type: mimeType,
    metadata: {
      type: 'converted document',
      user_id: res.locals.user._id
    }
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
      // add the reference ti the universitySearch

        User.findById(res.locals.user._id, function (err, user) {
          if (!user.files) { user.files = [] }
          user.files.push(file._id)
          user.save(function (err, updatedUser) {
            if (err) {
              console.log(err)
              return next(err, null)
            }
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
      })
    })
    .on('error', function (err) { console.log('error' + err) })
}

module.exports = router
