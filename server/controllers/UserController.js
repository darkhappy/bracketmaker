const User = require('../models/User')
const bcrypt = require('bcrypt')

function getAllUsers (req, res) {
  // eslint-disable-next-line n/handle-callback-err
  User.find().exec((err, users) => {
    res.json(users)
  })
}

function getUser (req, res) {
  // todo: a faire
}

function createUser (req, res) {
  User.find({ username: req.body.username }).exec((err, users) => {
    if (err || users.length > 0) {
      return res.status(409).json({ message: 'Username already exists' })
    } else {
      User.find({ email: req.body.email }).exec((err, users) => {
        if (err || users.length > 0) {
          return res.status(409).json({ message: 'Email already in use' })
        } else {
          const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            token: '',
            // token = createToken()
            isVerified: false,
            firstname: '',
            lastname: '',
            about: '',
            avatar: ''
          })
          user.save().then(() => {
            console.log('User created')
            return res.sendStatus(204)
          }).catch((err) => {
            return res.status(500).json(err)
          })
        }
      })
    }
  })
}

function updateUser (req, res) {
  const user = User.findById(req.body)
  user.username = req.body.username
  user.email = req.body.email
  user.password = req.body.password
  user.save().then(() => {
    return res.status(204)
  }).catch((err) => {
    return res.status(500).json(err)
  })
}

function deleteUser (req, res) {
  // todo: a faire
}

function createToken (user) {
  // todo: a faire
}

module.exports = { getAllUsers, createUser, updateUser, getUser, deleteUser, createToken }
