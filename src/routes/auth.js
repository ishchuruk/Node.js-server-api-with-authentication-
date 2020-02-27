const express = require('express')
const passport = require('passport')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/login', controller.login)
router.post('/register', passport.authenticate('jwt', {session: false}), controller.register )

module.exports = router