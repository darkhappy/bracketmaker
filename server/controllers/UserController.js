const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require("fs");

function getAllUsers (req, res) {
  User.find().exec((err, users) => {
    res.json(users)
  })
}

function getUser (req, res) {
  User.findOne({username: req.body.username},
      (err, user) => {
        if(err){
          return res.sendStatus(401);
        }
        if(bcrypt.compareSync(req.body.password, user.password)){
            let payload = {id: user.id};
            let key = crypto.randomBytes(16);
            let jwtToken = jwt.sign(payload, key, {expiresIn: '2h'});

            fs.writeFileSync('.env', 'SECRET_KEY='+key);

            res.cookie("SESSIONID", jwtToken, {httpOnly: true});
            res.cookie("sessioninfo", payload);

          return res.sendStatus(204);
        }
        return res.sendStatus(401);
      });
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
