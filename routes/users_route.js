const express = require("express");
const router = express.Router();
const passport = require('passport');
const usersController = require("../controllers/users_controller");

router.post('/registration', usersController.registerUser)
router.post('/login', usersController.loginUser)
router.get('/profile', passport.authenticate('jwt', {session: false}), usersController.userProfile)


module.exports = router;