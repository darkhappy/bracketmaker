const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  token: String,
  isVerified: Boolean,
  password: String,
  display_name: String,
  show_email: Boolean,
  about: String,
  avatar: String,
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }],
  tournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }]
}, {
  versionKey: false
})

userSchema.method('toJSON', function () {
  const { __v, id, ...object } = this.toObject()
  object.id = id
  return object
})
const User = mongoose.model('User', userSchema)

module.exports = User
