const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    username : String,
    email : String,
    token : String,
    password : String,
    firstname : String,
    lastname : String,
    about : String,
    avatar : String,
    subscriptions : [{type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'}],
    tournaments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;