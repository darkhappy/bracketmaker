const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const fs = require('fs')
const dotenv = require('dotenv')

function getAllUsers (req, res) {
  User.find().exec((err, users) => {
    res.json(users)
  })
}

function login (req, res) {
  User.findOne({ username: req.body.username },
    (err, user) => {
      if (err) {
        return res.sendStatus(401)
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = { id: user.id }
        const key = crypto.randomBytes(16)
        const jwtToken = jwt.sign(payload, key, { expiresIn: '2h' })

        const result = dotenv.config()
        const conn = result.parsed.CONNECTION_STRING

        fs.writeFileSync('.env', 'SECRET_KEY="' + key + '"\nCONNECTION_STRING="' + conn + '"')

        res.cookie('SESSIONID', jwtToken, { httpOnly: true })
        res.cookie('sessioninfo', payload)

        return res.sendStatus(204)
      }
      return res.sendStatus(401)
    })
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
    token: generate_token(15),
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

const createToken = async (req, res) => {
  User.find({ email: req.body.email }).exec((err, user) => {
    if (err || user.length === 0) {
      return res.status(401).json(err)
    } else {
      const email = generate_token(20)
      const filter = { _id: user[0]._id }
      const update = {
        $set: {
          token: email
        }
      }
      const options = { upsert: true }
      User.updateOne(filter, update, options).then(() => {
        return res.json(email)
      }).catch((err) => {
        return res.status(400).json(err)
      })
    }
  })
}

function updatePassword (req, res) {
  const filter = { token: req.params.token }
  const update = {
    $set: {
      password: bcrypt.hashSync(req.body.newPassword, 10)
    }
  }
  const options = { upsert: true }
  User.updateOne(filter, update, options).then(() => {
    console.log('Password updated')
    const filter = { token: req.params.token }
    const update = {
      $set: {
        token: ''
      }
    }
    const options = { upsert: true }
    User.updateOne(filter, update, options).then(() => {}).catch((err) => {
      return res.status(400).json(err)
    })
    return res.sendStatus(204)
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

function getToken (req, res) {
  User.findOne({ token: req.params.token }).exec((err, user) => {
    if (!user) {
      return res.status(401).json(err)
    }
  })
}

function activateUser (req, res) {
  User.find({ token: req.body.token }).exec((err, users) => {
    const token = req.query.token
    if (!token || err) return res.status(400).json({ message: 'Token not found' })
    User.find({ token }).exec((err, users) => {
      let user
      if (err || users.length === 0) {
        return res.status(404).json({ message: 'User not found' })
      } else {
        user = users[0]
        user.isVerified = true
        user.token = ''
        user.save().then(() => {
          console.log('User activated')
          return res.status(201).json({ message: 'User activated' })
        }).catch((err) => {
          return res.status(500).json(err)
        })
      }
    })
  })
}

// eslint-disable-next-line camelcase
function generate_token (length) {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
  const b = []
  for (let i = 0; i < length; i++) {
    const j = (Math.random() * (a.length - 1)).toFixed(0)
    b[i] = a[j]
  }
  return b.join('')
}

async function googleLogin (req, res) {
  console.log(req.body)
  const { email, idToken } = req.body
  const sameEmail = await User.find({ email }).exec()
  if (sameEmail.length > 0) {
    console.log('Email already in use' + email)
    return res.status(409).json({ message: 'Email already in use' })
  }
  const user = new User({
    username: '',
    email,
    password: '',
    token: '',
    isVerified: true,
    firstname: '',
    lastname: '',
    about: '',
    avatar: '',
    googleAuth: idToken
  })
  user.save().then(() => {
    console.log('User created via google')
    return res.status(200).json({ message: idToken })
  }).catch((err) => {
    return res.status(500).json(err)
  })
}

module.exports = { getAllUsers, createUser, updateUser, login, deleteUser, createToken, updatePassword, getToken, activateUser, googleLogin }
