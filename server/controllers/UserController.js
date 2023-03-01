const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const fs = require('fs')
const dotenv = require('dotenv')
const { CONNREFUSED } = require('dns')
const { dirname } = require('path')

function getUsers (req, res) {
  User.find({}, { username: 1, display_name: 1, avatar: 1, tournaments: 1, subscriptions: 1 }).exec((err, users) => {
    if (err) {
      return res.status(400)
    }
    return res.json(users)
  })
}

function getUserById (req, res) {
  User.findById(req.params._id).exec((err, user) => {
    if (err) {
      return res.status(401).json({ message: 'a' })
    }
    return res.status(200).json({ message: user })
  })
}

function getUser (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.status(401).json({ message: 'ab' })
    }
    return res.json({
      username: user.username,
      email: user.email,
      display_name: user.display_name,
      showEmail: user.show_email,
      about: user.about,
      avatar: user.avatar,
      subscriptions: user.subscriptions,
      tournaments: user.tournaments
    })
  })
}

function createUsers (req, res) {
  const users = [
    new User({
      username: 'test',
      email: 'test@test',
      token: '',
      isVerified: true,
      password: bcrypt.hashSync('test', 10),
      display_name: 'Jean-Philippe Miguel',
      show_email: true,
      about: 'I am a test user',
      avatar: '',
      googleAuth: '',
      subscriptions: [],
      tournaments: []
    }),
    new User({
      username: 'test2',
      email: 'test2@test',
      token: '',
      isVerified: true,
      password: bcrypt.hashSync('test', 10),
      display_name: 'Jean-Philippe Miguel',
      show_email: true,
      about: 'I am a test user',
      avatar: '',
      googleAuth: '',
      subscriptions: [],
      tournaments: []
    }),
    new User({
      username: 'test3',
      email: 'test3@test',
      token: '',
      isVerified: true,
      password: bcrypt.hashSync('test', 10),
      display_name: 'Jean-Philippe Miguel',
      show_email: true,
      about: 'I am a test user',
      avatar: '',
      googleAuth: '',
      subscriptions: [],
      tournaments: []
    }),
    new User({
      username: 'Coucou',
      email: 'coucou@coucou',
      token: '',
      isVerified: true,
      password: bcrypt.hashSync('test', 10),
      display_name: 'Je suis coucou',
      show_email: true,
      about: 'hey',
      avatar: '',
      googleAuth: '',
      subscriptions: [],
      tournaments: []
    }),
    new User({
      username: 'Raph',
      email: 'Raph@raph',
      token: '',
      isVerified: true,
      password: bcrypt.hashSync('test', 10),
      display_name: 'Raphael Rail',
      show_email: true,
      about: 'Je suis Raph',
      avatar: '',
      googleAuth: '',
      subscriptions: [],
      tournaments: []
    })
  ]
  User.insertMany(users, (err, docs) => {
    if (err) {
      return res.status(400).json(err)
    }
    return res.status(200).json(docs)
  })
}

function updateAvatar (username, path) {
  User.findOne({ username }).exec((err, user) => {
    if (err) {
      console.log(err)
    }
    user.avatar = path
    user.save()
  })
}

function getUserAvatar (req, res) {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err) {
      return res.status(401).json({ message: 'User not found' })
    }
    try {
      const path = dirname(require.main.filename) + '/assets/avatars/' + user.avatar
      return res.sendFile(path)
    } catch (err) {
      return res.status(401).json({ message: 'Image not found' })
    }
  })
}

function search (req, res) {
  const search = new RegExp('.*' + req.params.search + '.*', 'i')
  User.find({ username: search }, { username: 1, display_name: 1, avatar: 1, tournaments: 1, subscriptions: 1 }).exec((err, users) => {
    if (err) {
      return res.status(400)
    }
    return res.json(users)
  })
}

function changePassword (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.status(401).json({ message: 'asdafb' })
    }
    if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
      user.password = bcrypt.hashSync(req.body.newPassword, 10)
      user.save().then(() => {
        return res.sendStatus(204)
      }).catch((err) => {
        return res.status(500).json(err)
      })
    } else {
      return res.status(401).json({ message: 'asdahdstfb' })
    }
  })
}

function login (req, res) {
  User.findOne({ username: req.body.username },
    (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'asdahd658stfb' })
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = { id: user.id }
        const key = process.env.SECRET_KEY
        const jwtToken = jwt.sign(payload, key, { expiresIn: '2h' })

        const result = dotenv.config()
        const conn = result.parsed.CONNECTION_STRING

        res.cookie('SESSIONID', jwtToken, { httpOnly: true })
        res.cookie('sessioninfo', JSON.stringify(payload))
        return res.sendStatus(204)
      }
      return res.status(401).json({ message: 'asdahd3476658stfb' })
    })
}

function logout (req, res) {
  res.clearCookie('SESSIONID')
  res.clearCookie('sessioninfo')
  User.findOne({ _id: req.payload.id }, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'asdaerhd658stfb' })
    }
    user.token = ''
    user.save().then(() => {
      return res.sendStatus(204)
    }).catch((err) => {
      return res.status(500).json(err)
    })
  })
}

function isLoggedProfile (req, res) {
  console.log(req.payload.id)
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.status(401).json({ message: 'asdahd658stfb' })
    }
    console.log(user)
    return res.status(200).json(user.username == req.params.username)
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
    token: generateToken(15),
    isVerified: false,
    show_email: false,
    display_name: '',
    about: '',
    avatar: '',
    subscriptions: [],
    tournaments: []
  })
  user.save().then(() => {
    return res.status(201).json({ message: 'http://localhost:4200/auth/activate/?token=' + user.token })
  }).catch((err) => {
    return res.status(500).json(err)
  })
}

function updateUser (req, res) {
  const { _id, username } = req.body.message
  User.findById(_id).exec((err, user) => {
    user.username = username
    user.save().then(() => {
      return res.status(200)
    }).catch((err) => {
      return res.status(500).json(err)
    })
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
      const email = generateToken(20)
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

function resetPassword (req, res) {
  const filter = { token: req.params.token }
  const update = {
    $set: {
      password: bcrypt.hashSync(req.body.newPassword, 10)
    }
  }
  const options = { upsert: true }
  User.updateOne(filter, update, options).then(() => {
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
          return res.status(201).json({ message: 'User activated' })
        }).catch((err) => {
          return res.status(500).json(err)
        })
      }
    })
  })
}

// eslint-disable-next-line camelcase
function generateToken (length) {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
  const b = []
  for (let i = 0; i < length; i++) {
    const j = (Math.random() * (a.length - 1)).toFixed(0)
    b[i] = a[j]
  }
  return b.join('')
}

function getProfile (req, res) {
  User.findOne({ username: req.params.username }, { username: 1, email: 1, display_name: 1, about: 1, show_email: 1, avatar: 1 }).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    return res.status(200).json(user)
  })
}

function updateProfile (req, res) {
  let showEmail = req.body.showEmail
  const displayName = req.body.displayName !== '' ? req.body.displayName : ''
  const about = req.body.about !== '' ? req.body.about : ''
  if (showEmail === '') {
    showEmail = false
  }
  const filter = { _id: req.payload.id }
  const update = {
    $set: {
      display_name: displayName,
      about,
      show_email: showEmail
    }
  }
  const options = { upsert: true }
  User.updateOne(filter, update, options).then(() => {
    return res.sendStatus(204)
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

const changeUsername = async (req, res) => {
  User.findById(req.payload.id).exec(async (err, user) => {
    if (!user) {
      return res.status(401).json(err)
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ message: 'Wrong password' })
    }
    const username = user.username
    const sameUsername = await User.find({ username }).exec()
    if (sameUsername.length > 0) {
      return res.status(409).json({ message: 'Username already exists' })
    }

    user.username = req.body.username
    user.save().then(() => {
      return res.sendStatus(204)
    }).catch((err) => {
      return res.status(500).json(err)
    })
  })
}

const changeEmail = async (req, res) => {
  // same exact thing as changeUsername
  User.findById(req.payload.id).exec(async (err, user) => {
    if (!user) {
      return res.status(401).json(err)
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ message: 'Wrong password' })
    }

    const sameEmail = await User.find({ email }).exec()
    if (sameEmail.length > 0) {
      return res.status(409).json({ message: 'Email already exists' })
    }

    user.email = req.body.email
    user.save().then(() => {
      return res.sendStatus(204)
    }).catch((err) => {
      return res.status(500).json(err)
    })
  })
}

async function googleLogin (req, res) {
  let { email, idToken, name } = req.body

  const sameUsername = await User.find({ username: name }).exec()
  if (sameUsername.length > 0) {
    name = ''
  }
  const sameEmail = await User.find({ email }).exec()
  if (sameEmail.length > 0) {
    if (sameEmail[0].googleAuth === '') {
      sameEmail[0].googleAuth = idToken
      await sameEmail[0].save()
    }
    return res.status(200).json({ message: sameEmail })
  }
  const user = new User({
    username: name,
    email,
    password: '',
    token: '',
    isVerified: true,
    about: '',
    avatar: '',
    googleAuth: idToken
  })
  user.save().then(() => {
    const payload = { id: user._id }
    const jwtToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' })

    res.cookie('SESSIONID', jwtToken, { httpOnly: true })
    res.cookie('sessioninfo', JSON.stringify(payload))
    return res.status(200).json({ message: user })
  }).catch((err) => {
    return res.status(500).json(err)
  })
}

function followUser (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    User.findOne({ username: req.params.username }).exec((err, followed) => {
      if (err) {
        return res.sendStatus(400)
      }
      if (user.user_followed.includes(followed._id)) {
        return res.status(400).json({ message: 'You already follow this user' })
      }
      user.user_followed.push(followed._id)
      user.save().then(() => {
        return res.sendStatus(204)
      }).catch((err) => {
        return res.status(500).json(err)
      })
    })
  })
}

function isFollowed (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    User.findOne({ username: req.params.username }).exec((err, followed) => {
      if (err) {
        return res.sendStatus(400)
      }
      if (user.user_followed.includes(followed._id)) {
        return res.status(200).json(true)
      }
      return res.status(200).json(false)
    })
  })
}

function unfollowUser (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    User.findOne({ username: req.params.username }).exec((err, followed) => {
      if (err) {
        return res.sendStatus(400)
      }
      if (!user.user_followed.includes(followed._id)) {
        return res.status(400).json({ message: "You don't follow this user" })
      }
      const index = user.user_followed.indexOf(followed._id)
      if (index > -1) {
        user.user_followed.splice(index, 1)
      }
      user.save().then(() => {
        return res.sendStatus(204)
      }).catch((err) => {
        return res.status(500).json(err)
      })
    })
  })
}

module.exports = {
  changeUsername,
  getUsers,
  getUser,
  changeEmail,
  createUser,
  updateUser,
  login,
  deleteUser,
  createToken,
  resetPassword,
  getToken,
  activateUser,
  updateProfile,
  changePassword,
  googleLogin,
  getUserById,
  logout,
  createUsers,
  search,
  getProfile,
  isLoggedProfile,
  followUser,
  isFollowed,
  unfollowUser,
  updateAvatar,
  getUserAvatar
}
