const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

const keys = require('./config/config')

const app = express()

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => console.log("MongoDB connected"))
   .catch(e => console.log(e))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(
   session({
      secret: keys.session,
      saveUninitialized: true,
      resave: false
   })
)

app.use(require('morgan')('dev'))
app.use(require('cors')())      
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

module.exports = app