const http2 = require('spdy')
const express = require('express')
const path = require('path')
const app = express()
const logger = require('morgan')
const ClientStatsPath = path.join(__dirname, './static/stats.json')
const ServerRendererPath = path.join(__dirname, './static/server.js')
const ServerRenderer = require(ServerRendererPath).default
const Stats = require(ClientStatsPath)

const passport = require('passport')
const configDB = require('./config')

// add the part for socket.io

app.use(logger('dev'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))

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
// rotues for the server rendering

app.use('/static', express.static(path.join(__dirname, './static')))
// app.use('/', express.static(path.join(__dirname, './static')))
app.use(ServerRenderer(Stats))
app.listen(3000)

// TODO buy a certified certificat for the ssl

// TODO Test the HTTP2
var options = {
  key: fs.readFileSync('./certificats/server.key'),
  cert: fs.readFileSync('./certificats/server.crt')

}
var server = http2.createServer(options, app)
  .listen(3000, () => {
    console.log('Sport In is listening on https://localhost:3000')
  })

var io = require('socket.io')(server)
require('./server/io')(io)
