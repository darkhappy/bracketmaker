const mongoose = require('mongoose');
const Tournament = require('./tournament');

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    avatar : String,
    display_name : String,
    subscriptions : [{type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'}],
    tournaments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;