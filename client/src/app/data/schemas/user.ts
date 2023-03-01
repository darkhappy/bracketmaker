export interface User {
  _id?: string,
  username: string,
  email: string,
  display_name: string,
  about: string,
  showEmail: boolean,
  avatar: string,
  subscriptions: [string],
  tournaments: [string],
}
