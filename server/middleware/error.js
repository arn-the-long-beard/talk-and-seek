module.exports = (res, err, object, next) => {
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
