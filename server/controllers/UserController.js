const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const fs = require('fs')
const dotenv = require("dotenv");
const { CONNREFUSED } = require('dns')

function getAllUsers (req, res) {
  User.find().exec((err, users) => {
    res.json(users)
  })
}

function getUser (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(401)
    }
    console.log(user)
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

function changePassword (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(401)
    }
    if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
      user.password = bcrypt.hashSync(req.body.newPassword, 10)
      user.save().then(() => {
        return res.sendStatus(204)
      }).catch((err) => {
        return res.status(500).json(err)
      })
    } else {
      return res.sendStatus(401)
    }
  })
}


function login (req, res) {
  User.findOne({ username: req.body.username },
    (err, user) => {
      if (err) {
        return res.sendStatus(401)
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = { id: user._id }
        const jwtToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' })

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
function generate_token (length) {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
  const b = []
  for (let i = 0; i < length; i++) {
    const j = (Math.random() * (a.length - 1)).toFixed(0)
    b[i] = a[j]
  }
  return b.join('')
}

function updateProfile(req, res) {
  
  let showEmail = req.body.showEmail;
  const displayName = req.body.displayName !== '' ? req.body.displayName : ''
  const about = req.body.about !== '' ? req.body.about : ''
  if (showEmail === '') {
    showEmail = false
  }
  const filter = { _id: req.payload.id }
  const update = {
    $set: {
      display_name: displayName,
      about: about,
      show_email: showEmail,
    },
  };
  const options = { upsert: true };
  User.updateOne(filter, update, options).then(() => {
    return res.sendStatus(204);
  }).catch((err) => {
    return res.status(400).json(err);
  });
}

const changeUsername = async (req, res) => {
  User.findById(req.payload.id).exec(async (err, user) => {
    if (!user) {
      return res.status(401).json(err);
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const sameUsername = await User.find({ username }).exec();
    if (sameUsername.length > 0) {
      return res.status(409).json({ message: "Username already exists" });
    }

    user.username = req.body.username;
    user.save().then(() => {
      return res.sendStatus(204);
    }).catch((err) => {
      return res.status(500).json(err);
    });
  });
};

const changeEmail = async (req, res) => {
  // same exact thing as changeUsername
  User.findById(req.payload.id).exec(async (err, user) => {
    if (!user) {
      return res.status(401).json(err);
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const sameEmail = await User.find({ email }).exec();
    if (sameEmail.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    user.email = req.body.email;
    user.save().then(() => {
      return res.sendStatus(204);
    }).catch((err) => {
      return res.status(500).json(err);
    });
  });
};

module.exports = {
  changeUsername,
  getAllUsers,
  getUser,
  changeEmail,
  createUser,
  updateUser,
  login,
  deleteUser,
  createToken,
  updatePassword,
  getToken,
  activateUser,
  updateProfile,
  changePassword,
};

