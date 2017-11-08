const express = require('express')
const router = new express.Router()

const myprofile = require('./myprofile')
router.use('/myprofile', myprofile)

module.exports = router
