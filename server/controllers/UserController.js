const User = require('../models/User');

function getAllUsers(req, res) {
    User.find().exec((err, users) => {
        res.json(users);
    });
}

function createUser(req, res) {
    let user = new User(req.body);
    user.save().then(()=> {
        console.log("User created");
        return res.sendStatus(204);
    }).catch((err) => {
        return res.status(500).json(err);
    });  
}

function updateUser (req, res) {
    let user = User.findById(req.body);
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save().then(()=> {
        return res.status(204);
    }).catch((err) => {
        return res.status(500).json(err);
    });
}

module.exports = { getAllUsers, createUser, updateUser}