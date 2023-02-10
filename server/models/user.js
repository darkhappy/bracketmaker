const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  token: String,
  isVerified: Boolean,
  password: String,
  firstname: String,
  lastname: String,
  about: String,
  avatar: String,
  googleAuth: String,
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }],
  tournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }]
}, {
  versionKey: false
})

const User = mongoose.model('User', userSchema)

module.exports = User
