export interface User {
  _id: String,
  username: String,
  email: String,
  display_name: String,
  about: String,
  showEmail: Boolean,
  avatar: String,
  subscriptions: [String],
  tournaments: [String],
}
