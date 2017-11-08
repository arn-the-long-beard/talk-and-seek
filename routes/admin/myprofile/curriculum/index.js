const express = require('express')
const router = new express.Router()

const User = require('../../../../models/user')
const Education = require('../../../../models/education')
const ProgramNotFound = require('../../../../models/university/programNotFound')
const Bachelor = require('../../../../models/university/bachelor')

const checkError = (res, err, object, next) => {
  'use strict'
  if (err || !object) {
    return res.status(409).json({
      success: false,
      err: err,
      message: 'error on saving program'
    })
  } else {
    return next()
  }
}

const saveProgram = (newProgram, next) => {
  'use strict'
  newProgram.save((err, prog) => {
    if (err) {
      console.log(err)
    }
    return next(null, prog)
  })
}

const saveDegree = (newDegree, next) => {
  newDegree.save((err, deg) => {
    if (err) {
      console.log(err)
    }
    return next(null, deg)
  })
}

const saveEducation = (newEducation, next) => {
  'use strict'
  newEducation.save((err, deg) => {
    if (err) {
      console.log(err)
    }
    return next(null, deg)
  })
}
router.post('', (req, res) => {
  'use strict'
  User.findById(res.locals.user._id, (err, user) => {
    checkError(res, err, user, () => {
      let programNotFound = new ProgramNotFound({
        name: req.body.program,
        description: 'test',
        university: req.body.university
      })
      let degree = new Bachelor({title: req.body.degree, description: 'test'})
      saveProgram(programNotFound, (err, prog) => {
        checkError(res, err, prog, () => {
          saveDegree(degree, (err, deg) => {
            checkError(res, err, deg, () => {
              let education = new Education({
                program: {status: 'ProgramNotFound', program_id: prog},
                degree: {status: 'Bachelor', degree_id: deg},
                grade: req.body.grade,
                awards: req.body.awards,
                honors: req.honors,
                user: res.locals.user,
                from: req.body.from,
                to: req.body.to
              })
              saveEducation(education, (err, newEducation) => {
                checkError(res, err, newEducation, () => {
                  user.curriculum.push(newEducation)
                  user.save((err, userUpdated) => {
                    if (err) {
                      return res.status(409).json({
                        success: false,
                        err: err,
                        message: 'error on getting the education'
                      })
                    }
                    Education.findById(newEducation._id)
                      .populate('program.program_id')
                      .populate('degree.degree_id')
                      .exec(function (err, ed) {
                        //   console.log(mygroup)
                        if (err) {
                          return res.status(409).json({
                            success: false,
                            err: err,
                            message: 'error on getting the education'
                          })
                        }
                        return res.status(200).json({
                          success: true,
                          message: 'You have your education',
                          education: ed
                        })
                      })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
module.exports = router
