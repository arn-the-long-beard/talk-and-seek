// const http2 = require('spdy')
const express = require('express')
const path = require('path')
const app = express()
const logger = require('morgan')
const ClientStatsPath = path.join(__dirname, './static/stats.json')
const ServerRendererPath = path.join(__dirname, './static/server.js')
const ServerRenderer = require(ServerRendererPath).default
const Stats = require(ClientStatsPath)
const favicon = require('serve-favicon')
app.use(logger('dev'))
// add the part for socket.io
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))

app.use('/static', express.static(path.join(__dirname, './static')))
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
app.use(ServerRenderer(Stats))
app.listen(process.env.PORT || 5000)

// TODO buy a certified certificat for the ssl

// TODO Test the HTTP2
// var options = {
//   key: fs.readFileSync('./certificats/server.key'),
//   cert: fs.readFileSync('./certificats/server.crt')
//
// }
/*
http2.createServer(options, app)
  .listen(3000, '0.0.0.0', () => {
    console.log('talk-and-seek is listening on https://localhost:3000')
  })
*/
