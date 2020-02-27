const express = require('Express')
const passport = require('passport')

const userController = require('../controllers/user')
const router = express.Router()

router.post('/adduser', passport.authenticate('jwt', {session: false}), userController.addNew)
router.delete('/removeuser', passport.authenticate('jwt', {session: false}), userController.delete)
router.patch('/edituser', passport.authenticate('jwt', {session: false}), userController.edit)

module.exports = router