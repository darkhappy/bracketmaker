const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

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

function createToken (req, res) {
  User.find({email: req.body.email}).exec((err, user) => {
    if (err || user.length === 0) {
      return res.status(401).json(err);
    }
    else {
      let email = bcrypt.hashSync(user[0].email, 10);
      const filter = { _id: user[0]._id };
      const update = {
          $set: {
            token: email
          }
      };
      const options = { upsert: true };
      User.updateOne(filter, update, options).then(()=> {
        let payload = {id: email};
        console.log(payload);
        let jwtToken = jwt.sign(payload, 'email', {expiresIn: '2h'});
        console.log(jwtToken);
        res.cookie('TOKEN', jwtToken, {httpOnly: true});  
        return res.json(email);
      }).catch((err) => {
        return res.status(400).json(err);
      });
      
    }
});
}

module.exports = { getAllUsers, createUser, updateUser, getUser, deleteUser, createToken }
