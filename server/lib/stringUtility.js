exports.cleanString = string => {
  'use strict'
  let trimmedString = string.trim()

  var i = 0, strLength = trimmedString.length
  for (i; i < strLength; i++) {
    trimmedString = trimmedString.replace(' ', '_')
  }
    // in case something wrong happend
  trimmedString = trimmedString.trim()

  return trimmedString
}

exports.noExtension = string => {
  return string.substr(0, string.lastIndexOf('.')) || string
}

exports.newExtension = (string, newExtension) => {
  string = this.noExtension(string)
  return string + '.' + newExtension
}
