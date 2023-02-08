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

const createToken = async (req, res) => {
  User.find({email: req.body.email}).exec((err, user) => {
    if (err || user.length === 0) {
      return res.status(401).json(err);
    }
    else {
      let email = generate_token(20);
      const filter = { _id: user[0]._id };
      const update = {
          $set: {
            token: email
          }
      };
      const options = { upsert: true };
      User.updateOne(filter, update, options).then(()=> {
        return res.json(email);
      }).catch((err) => {
        return res.status(400).json(err);
      });
      
    }
  });
}

function updatePassword (req, res) {
  const filter = { token: req.params.token };
  const update = {
      $set: {
        password: bcrypt.hashSync(req.body.newPassword, 10)
      }
  };
  const options = { upsert: true };
  User.updateOne(filter, update, options).then(()=> {
    console.log('Password updated');
    const filter = { token: req.params.token };
    const update = {
        $set: {
          token: ''
        }
    };
    const options = { upsert: true };
    User.updateOne(filter, update, options).then(()=> {}).catch((err) => {
      return res.status(400).json(err);
    });
    return res.sendStatus(204);
  }).catch((err) => {
    return res.status(400).json(err);
  });
}

function getToken(req, res) {
  User.findOne({token: req.params.token}).exec((err, user) => {
    if (!user) {
      return res.status(401).json(err);
    }
  });
}


function generate_token(length){
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];  
  for (var i=0; i<length; i++) {
    var j = (Math.random() * (a.length-1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}

module.exports = { getAllUsers, createUser, updateUser, getUser, deleteUser, createToken, updatePassword, getToken}
