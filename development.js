// http2 implementation start here
const http2 = require('spdy')
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
const passport = require('passport')
const configDB = require('./config')

app.use(logger('dev'))
app.use(require('cookie-parser')())
// app.use(require('body-parser').urlencoded({ extended: true }))
app.use(bodyParser.json()) // <--- Here
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  secure: true
}))

app.use(passport.initialize())
app.use(passport.session())
require('./server/models').connect(configDB.dbUri)

var User = require('./server/models/user')
// var Account = require('./models/account');
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// passport.use(new LocalStrategy(User.authenticate()))
// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check')
const auth = require('./server/routes/auth')
const apiRoutes = require('./server/routes/api')
const publicRoutes = require('./server/routes/public')
app.use('/api', authCheckMiddleware)
app.use('/api', apiRoutes)
app.use('/auth', auth)
app.use('/public', publicRoutes)
// additional routes

// Isomorphism part

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/static/'
}))
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')))
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
app.use(webpackHotServerMiddleware(compiler))
// run the https2 server
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const options = {
  key: fs.readFileSync('./certificats/server.key'),
  cert: fs.readFileSync('./certificats/server.crt')
}
const server = http2.createServer(options, app)
.listen(8080, '0.0.0.0', () => {
  console.log('Sport In is listening on https://localhost:8080')
})

const io = require('socket.io')(server)
require('./server/io')(io)
