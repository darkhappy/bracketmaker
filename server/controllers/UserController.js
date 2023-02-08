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

async function createUser (req, res) {
  const { username, email, password } = req.body
  const sameUsername = await User.find({ username }).exec()
  if (sameUsername.length > 0) {
    return res.status(409).json({ message: 'Username already exists' })
  }
  const sameEmail = await User.find({ email }).exec()
  if (sameEmail.length > 0) {
    return res.status(409).json({ message: 'Email already in use' })
  }
  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    token: createToken(),
    isVerified: false,
    firstname: '',
    lastname: '',
    about: '',
    avatar: ''
  })
  user.save().then(() => {
    console.log('User created')
    return res.status(201).json({ message: 'http://localhost:4200/auth/activate/?token=' + user.token })
  }).catch((err) => {
    return res.status(500).json(err)
  })
}

function activateUser (req, res) {
  const token = req.query.token
  if (!token) return res.status(400).json({ message: 'Token not found' })
  User.find({ token: token }).exec((err, users) => {
    let user
    if (err || users.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    } else {
      user = users[0]
      user.isVerified = true
      user.token = ''
      user.save().then(() => {
        return res.status(201).json({ message: 'User activated' })
      }).catch((err) => {
        return res.status(500).json(err)
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

function createToken () {
  return bcrypt.hashSync(Date.now().toString(), 10)
}

module.exports = { getAllUsers, createUser, updateUser, getUser, deleteUser, activateUser }
