module.exports = (strinPath, next) => {
  'use strict'
  const util = require('util')
  const fileExtension = require('file-extension')
  const exec = util.promisify(require('child_process').exec)

  async function convertPDFToXML (strinPath) {
    const { stdout, stderr } = await exec('pdf2xml ' + strinPath)
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
    return await {response: {err: stderr, out: stdout}}
  }
  return convertPDFToXML(strinPath)
   .then(response => { return next(null, response) })
   .catch((err) => { return next(err, null) })
}
