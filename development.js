// http2 implementation start here
// const http2 = require('spdy')

const http = require('http')
const logger = require('morgan')
const fs = require('fs')
const express = require('express')
const path = require('path')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
var favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const config = require('./webpack.development.config.js')
const compiler = webpack(config)
var app = express()

app.use(logger('dev'))
app.use(require('cookie-parser')())
// app.use(require('body-parser').urlencoded({ extended: true }))
app.use(bodyParser.json()) // <--- Here
app.use(bodyParser.urlencoded({extended: true}))

// additional routes

// Isomorphism part

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/static/'
}))
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
app.use(webpackHotServerMiddleware(compiler))

/*

// Todo Generate keys yourself and then use spdy
// run the https2 server

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const options = {
  key: fs.readFileSync('./certificats/server.key'),
  cert: fs.readFileSync('./certificats/server.crt')
}
http2.createServer(options, app)
.listen(3000, '0.0.0.0', () => {
  console.log('Sport In is listening on https://localhost:3000')
})
*/

http.createServer(app)
  .listen(3000, '0.0.0.0', () => {
    console.log('Sport In is listening on https://localhost:3000')
  })
