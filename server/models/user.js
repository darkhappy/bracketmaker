const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  token: String,
  isVerified: Boolean,
  password: String,
  display_name: String,
  about: String,
  avatar: String,
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }],
  tournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }]
}, {
  versionKey: false
})

const User = mongoose.model('User', userSchema)

module.exports = User
