const mongoose = require('mongoose');
const Tournament = require('./tournament');

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    avatar : String,
    display_name : String,
    subscriptions : [Tournament.schema],
    tournaments: [Tournament.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;