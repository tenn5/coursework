const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../config/keys').secret;
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    let {
      nickname,
      email,
      password,
    } = req.body
    const userWithSuchNickname = await User.findOne({
      nickname: nickname
    })
    const userWithSuchEmail = await User.findOne({
      email: email
    })
    if (userWithSuchNickname !== null || userWithSuchEmail !== null) {
      return res.status(400).json({
        msg: 'User with this nickname or email already exists.'
      })
    }
    let newUser = new User({
      nickname,
      password,
      email
    })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err
        } else {
          newUser.password = hash
          newUser.save().then(user => {
            return res.status(201).json({
              success: true,
              msg: 'User is now registered.'
            })
          })
        }
      })
    })
  } catch (e) {
    console.log(e)
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email}, '_id nickname password email')
    if (!user) {
      return res.status(404).json({
        msg: 'Email is not found.',
        success: false
      })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (isMatch) {
      const payload = {
        _id: user._id,
        nickname: user.nickname,
        email: user.email
      }
      jwt.sign(payload, key, {
        expiresIn: 604800
      }, (err, token) => {
        return res.status(200).json({
          success: true,
          token: `Bearer ${token}`,
          user: user,
          msg: 'You are now logged in.'
        })
      })
    } else {
      return res.status(404).json({
        msg: 'Incorrect password.',
        success: false
      })
    }
  } catch (e) {
    console.log(e)
  }
}

exports.userProfile = (req, res) => {
  return res.json({
    user: req.user
  })
}