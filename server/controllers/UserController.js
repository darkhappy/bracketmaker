const User = require('../models/User')

function getAllUsers (req, res) {
  User.find().exec((err, users) => {
    res.json(users)
  })
}

function getUser (req, res) {
  // todo: a faire
}

function createUser (req, res) {
  const user = new User(req.body)
  user.save().then(() => {
    console.log('User created')
    return res.sendStatus(204)
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

module.exports = { getAllUsers, createUser, updateUser, getUser, deleteUser }
