const express = require('express')
const router = new express.Router()
const User = require('../../../models/user')

const educationRoutes = require('./curriculum')
router.use('/education', educationRoutes)

router.get('', (req, res) => {
  User.findById(res.locals.user._id).populate({
    path: 'member_of',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'group_id', populate: {path: 'university_id'} } })
    .populate({ path: 'curriculum', populate: { path: 'degree.degree_id'}, populate: { path: 'program.program_id' }})
    .populate('files')
    .exec(function (err, user) {
      //   console.log(mygroup)
      if (err) {
        return res.status(409).json({
          success: false,
          err: err,
          message: 'error on getting the user'
        })
      }
      return res.status(200).json({
        success: true,
        message: 'You have your complete information',
        user: user
      })
    })
})

module.exports = router
