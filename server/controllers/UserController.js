const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { dirname } = require('path')

/**
 *
 * @param req : requête http
 * @param res : réponse http
 * @description : Récupère tous les utilisateurs
 * @return : Les utilisateurs
 */
function getUsers (req, res) {
  User.find({}, { username: 1, display_name: 1, avatar: 1, tournaments: 1, subscriptions: 1 }).exec((err, users) => {
    if (err) {
      return res.status(400)
    }
    return res.json(users)
  })
}

/**
 *
 * @param req : requête http
 * @param res : réponse http
 * @description : Récupère un utilisateur par son id
 * @return : L'utilisateur
 */
function getUserById (req, res) {
  User.findById(req.params._id).exec((err, user) => {
    if (err) {
      return res.status(401).json({ message: 'a' })
    }
    return res.status(200).json({ message: user })
  })
}

/**
 *
 * @param req : requête http
 * @param res : réponse http
 * @description : Récupère l'utilisateur connecté
 */
function getUser (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.status(401).json({ message: 'ab' })
    }
    return res.json({
      username: user.username,
      email: user.email,
      display_name: user.display_name,
      showEmail: user.show_email,
      about: user.about,
      avatar: user.avatar,
      subscriptions: user.subscriptions,
      tournaments: user.tournaments
    })
  })
}

/**
 *
 * @param req : requête http
 * @param res : réponse http
 * @description : Crée des utilisateurs pour tester
 * @return : La réponse si la requête a réussi (200 ou 201) ou non (400 ou 401)
 */
function createUsers (req, res) {
  const users = [
    new User({
      username: 'test',
      email: 'test@test',
      token: '',
      isVerified: true,
      password: bcrypt.hashSync('test', 10),
      display_name: 'Jean-Philippe Miguel',
      show_email: true,
      about: 'I am a test user',
      avatar: '',
      googleAuth: '',
      subscriptions: [],
      tournaments: []
    }),
    new User({
      username: 'test2',
      email: 'test2@test',
      token: '',
      isVerified: true,
      password: bcrypt.hashSync('test', 10),
      display_name: 'Jean-Philippe Miguel',
      show_email: true,
      about: 'I am a test user',
      avatar: '',
      googleAuth: '',
      subscriptions: [],
      tournaments: []
    }),
    new User({
      username: 'test3',
      email: 'test3@test',
      token: '',
      isVerified: true,
      password: bcrypt.hashSync('test', 10),
      display_name: 'Jean-Philippe Miguel',
      show_email: true,
      about: 'I am a test user',
      avatar: '',
      googleAuth: '',
      subscriptions: [],
      tournaments: []
    }),
    new User({
      username: 'Coucou',
      email: 'coucou@coucou',
      token: '',
      isVerified: true,
      password: bcrypt.hashSync('test', 10),
      display_name: 'Je suis coucou',
      show_email: true,
      about: 'hey',
      avatar: '',
      googleAuth: '',
      subscriptions: [],
      tournaments: []
    }),
    new User({
      username: 'Raph',
      email: 'Raph@raph',
      token: '',
      isVerified: true,
      password: bcrypt.hashSync('test', 10),
      display_name: 'Raphael Rail',
      show_email: true,
      about: 'Je suis Raph',
      avatar: '',
      googleAuth: '',
      subscriptions: [],
      tournaments: []
    })
  ]
  User.insertMany(users, (err, docs) => {
    if (err) {
      return res.status(400).json(err)
    }
    return res.status(200).json(docs)
  })
}

/**
 *
 * @param name : id de l'utilisateur
 * @param path : nom du fichier de l'image
 * @description : Met à jour l'avatar de l'utilisateur
 */
function updateAvatar (name, path) {
  console.log(path)
  User.findOne({ username: name }).exec((err, user) => {
    if (err) {
      console.log(err)
    }
    user.avatar = path
    user.save()
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Récupère l'avatar d'un utilisateur
 * @return : L'image de l'utilisateur
 */
function getUserAvatar (req, res) {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err) {
      return res.status(401).json({ message: 'User not found' })
    }
    try {
      const path = dirname(require.main.filename) + '/assets/avatars/' + user.avatar
      return res.sendFile(path)
    } catch (err) {
      return res.status(401).json({ message: 'Image not found' })
    }
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Cherche des utilisateurs par son nom d'utilisateur
 * @return : Les utilisateurs correspondants
 */
function search (req, res) {
  const search = new RegExp('.*' + req.params.search + '.*', 'i')
  User.find({ username: search }, { username: 1, display_name: 1, avatar: 1, tournaments: 1, subscriptions: 1 }).exec((err, users) => {
    if (err) {
      return res.status(400)
    }
    return res.json(users)
  })
}

/**
 *
 * @param req : requête http
 * @param res : réponse http
 * @description : Change le mot de passe de l'utilisateur
 * @return : La réponse si la requête a réussi (204) ou non (401 ou 500)
 */
function changePassword (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.status(401).json({ message: 'asdafb' })
    }
    if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
      user.password = bcrypt.hashSync(req.body.newPassword, 10)
      user.save().then(() => {
        return res.sendStatus(204)
      }).catch((err) => {
        return res.status(500).json(err)
      })
    } else {
      return res.status(401).json({ message: 'asdahdstfb' })
    }
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Authentifie l'utilisateur et le connecte
 * @return : La réponse si la requête a réussi (204) ou non (401)
 */
function login (req, res) {
  User.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] }).exec(
    (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'asdahd658stfb' })
      }
      if (!user) {
        return res.status(401).json({ message: 'asdahd347stfb' })
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = { id: user.id }
        const key = process.env.SECRET_KEY
        const jwtToken = jwt.sign(payload, key, { expiresIn: '24h' })

        const result = dotenv.config()

        res.cookie('SESSIONID', jwtToken, { httpOnly: true })
        res.cookie('sessioninfo', JSON.stringify(payload))
        return res.sendStatus(204)
      }
      return res.status(401).json({ message: 'asdahd3476658stfb' })
    })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Déconnecte l'utilisateur
 * @return : La réponse si la requête a réussi (204) ou non (401 ou 500)
 */
function logout (req, res) {
  res.clearCookie('SESSIONID')
  res.clearCookie('sessioninfo')
  User.findOne({ _id: req.payload.id }, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'asdaerhd658stfb' })
    }
    user.token = ''
    user.save().then(() => {
      return res.sendStatus(204)
    }).catch((err) => {
      return res.status(500).json(err)
    })
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Authentifie l'utilisateur et le connecte
 * @return : La réponse si la requête a réussi (204) ou non (401)
 */
function isLoggedProfile (req, res) {
  console.log(req.payload.id)
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.status(401).json({ message: 'asdahd658stfb' })
    }
    console.log(user)
    return res.status(200).json(user.username === req.params.username)
  })
}
/**
 *
 * @param req : requête http
 * @param res : réponse http
 * @description : Créer un utilisateur
 */
async function createUser (req, res) {
  const { username, email, password } = req.body
  const sameUsername = await User.find({ username }).exec()
  if (sameUsername.length > 0) {
    return res.status(409).json({ message: 'Username already exists' })
  }
  const sameEmail = await User.find({ email }).exec()
  if (sameEmail.length > 0) {
    return res.status(409).json({ message: 'Email already in use' })
  }
  const user = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    token: generateToken(15),
    isVerified: false,
    show_email: false,
    display_name: '',
    about: '',
    avatar: '',
    subscriptions: [],
    tournaments: []
  })
  user.save().then(() => {
    return res.status(201).json({ message: 'http://localhost:4200/auth/activate/?token=' + user.token })
  }).catch((err) => {
    return res.status(500).json(err)
  })
}

/**
 *
 * @param req : requête http
 * @param res : réponse http
 * @description : Met à jour les informations de l'utilisateur
 */
function updateUser (req, res) {
  const { _id, username } = req.body.message
  User.findById(_id).exec((err, user) => {
    user.username = username
    user.save().then(() => {
      return res.status(200)
    }).catch((err) => {
      return res.status(500).json(err)
    })
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Créer un identifiant de réinitialisation de mot de passe et d'activation de compte
 */
const createToken = async (req, res) => {
  User.find({ email: req.body.email }).exec((err, user) => {
    if (err || user.length === 0) {
      return res.status(401).json(err)
    } else {
      const email = generateToken(20)
      const filter = { _id: user[0]._id }
      const update = {
        $set: {
          token: email
        }
      }
      const options = { upsert: true }
      User.updateOne(filter, update, options).then(() => {
        return res.json(email)
      }).catch((err) => {
        return res.status(400).json(err)
      })
    }
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Réinitialise le mot de passe de l'utilisateur
 * @return : La réponse si la requête a réussi (204) ou non (400)
*/

function resetPassword (req, res) {
  const filter = { token: req.params.token }
  const update = {
    $set: {
      password: bcrypt.hashSync(req.body.newPassword, 10)
    }
  }
  const options = { upsert: true }
  User.updateOne(filter, update, options).then(() => {
    const filter = { token: req.params.token }
    const update = {
      $set: {
        token: ''
      }
    }
    const options = { upsert: true }
    User.updateOne(filter, update, options).then(() => {}).catch((err) => {
      return res.status(400).json(err)
    })
    return res.sendStatus(204)
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

/**
 *
 * @param req : requête http
 * @param res : réponse http
 * @description : Vérifie si le token est valide
 */
function getToken (req, res) {
  User.findOne({ token: req.params.token }).exec((err, user) => {
    if (!user) {
      return res.status(401).json(err)
    }
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Active le compte de l'utilisateur
 */
function activateUser (req, res) {
  User.find({ token: req.body.token }).exec((err, users) => {
    const token = req.query.token
    if (!token || err) return res.status(400).json({ message: 'Token not found' })
    User.find({ token }).exec((err, users) => {
      let user
      if (err || users.length === 0) {
        return res.status(404).json({ message: 'User not found' })
      } else {
        user = users[0]
        user.isVerified = true
        user.token = ''
        user.save().then(() => {
          return res.status(201).json({ message: 'User activated' })
        }).catch((err) => {
          return res.status(500).json(err)
        })
      }
    })
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Génère un token aléatoire
 */
// eslint-disable-next-line camelcase
function generateToken (length) {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
  const b = []
  for (let i = 0; i < length; i++) {
    const j = (Math.random() * (a.length - 1)).toFixed(0)
    b[i] = a[j]
  }
  return b.join('')
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Récupère les informations d'un utilisateur
 */
function getProfile (req, res) {
  User.findOne({ username: req.params.username }, { username: 1, email: 1, display_name: 1, about: 1, show_email: 1, avatar: 1 }).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    return res.status(200).json(user)
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Met à jour les informations d'un utilisateur
 */
function updateProfile (req, res) {
  let showEmail = req.body.showEmail
  const displayName = req.body.displayName !== '' ? req.body.displayName : ''
  const about = req.body.about !== '' ? req.body.about : ''
  if (showEmail === '') {
    showEmail = false
  }
  const filter = { _id: req.payload.id }
  const update = {
    $set: {
      display_name: displayName,
      about,
      show_email: showEmail
    }
  }
  const options = { upsert: true }
  User.updateOne(filter, update, options).then(() => {
    return res.sendStatus(204)
  }).catch((err) => {
    return res.status(400).json(err)
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Change le nom d'utilisateur de l'utilisateur
 */
const changeUsername = async (req, res) => {
  User.findById(req.payload.id).exec(async (err, user) => {
    if (!user) {
      return res.status(401).json(err)
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ message: 'Wrong password' })
    }
    const username = user.username
    const sameUsername = await User.find({ username }).exec()
    if (sameUsername.length > 0) {
      return res.status(409).json({ message: 'Username already exists' })
    }

    user.username = req.body.username
    user.save().then(() => {
      return res.sendStatus(204)
    }).catch((err) => {
      return res.status(500).json(err)
    })
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Change le courriel d'un utilisateur
 */
const changeEmail = async (req, res) => {
  // same exact thing as changeUsername
  User.findById(req.payload.id).exec(async (err, user) => {
    if (!user) {
      return res.status(401).json(err)
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ message: 'Wrong password' })
    }

    const sameEmail = await User.find({ email }).exec()
    if (sameEmail.length > 0) {
      return res.status(409).json({ message: 'Email already exists' })
    }

    user.email = req.body.email
    user.save().then(() => {
      return res.sendStatus(204)
    }).catch((err) => {
      return res.status(500).json(err)
    })
  })
}

/**
 *
 * @param req : requête http
 * @param res : réponse http
 * @description : Permet à un utilisateur de se connecter avec son compte Google
 */
async function googleLogin (req, res) {
  let { email, idToken, name } = req.body

  const sameUsername = await User.find({ username: name }).exec()
  if (sameUsername.length > 0) {
    name = ''
  }
  const sameEmail = await User.find({ email }).exec()
  if (sameEmail.length > 0) {
    if (sameEmail[0].googleAuth === '') {
      sameEmail[0].googleAuth = idToken
      await sameEmail[0].save()
    }
    return res.status(200).json({ message: sameEmail })
  }
  const user = new User({
    username: name,
    email,
    password: '',
    token: '',
    isVerified: true,
    about: '',
    avatar: '',
    googleAuth: idToken
  })
  user.save().then(() => {
    const payload = { id: user._id }
    const jwtToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' })

    res.cookie('SESSIONID', jwtToken, { httpOnly: true })
    res.cookie('sessioninfo', JSON.stringify(payload))
    return res.status(200).json({ message: user })
  }).catch((err) => {
    return res.status(500).json(err)
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Abonne l'utilisateur à un autre utilisateur
 */
function followUser (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    User.findOne({ username: req.params.username }).exec((err, followed) => {
      if (err) {
        return res.sendStatus(400)
      }
      if (user.user_followed.includes(followed._id)) {
        return res.status(400).json({ message: 'You already follow this user' })
      }
      user.user_followed.push(followed._id)
      user.save().then(() => {
        followed.followers.push(user._id)
        followed.save().then(() => {
          return res.sendStatus(204)
        }).catch((err) => {
          return res.status(400).json(err)
        })
      }).catch((err) => {
        return res.status(400).json(err)
      })
    })
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Vérifie si l'utilisateur suit un autre utilisateur
 */
function isFollowed (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    User.findOne({ username: req.params.username }).exec((err, followed) => {
      if (err) {
        return res.sendStatus(400)
      }
      if (user.user_followed.includes(followed._id)) {
        return res.status(200).json(true)
      }
      return res.status(200).json(false)
    })
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Désabonne l'utilisateur à un autre utilisateur
 */
function unfollowUser (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    User.findOne({ username: req.params.username }).exec((err, followed) => {
      if (err) {
        return res.sendStatus(400)
      }
      if (!user.user_followed.includes(followed._id)) {
        return res.status(400).json({ message: "You don't follow this user" })
      }
      const index = user.user_followed.indexOf(followed._id)
      if (index > -1) {
        user.user_followed.splice(index, 1)
      }

      const indexFollowers = followed.followers.indexOf(user._id)
      if (indexFollowers > -1) {
        followed.followers.splice(indexFollowers, 1)
      }

      followed.save().then(() => {
        user.save().then(() => {
          return res.sendStatus(204)
        }).catch((err) => {
          return res.status(500).json(err)
        })
      }).catch((err) => {
        return res.status(500).json(err)
      })
    })
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Récupère les utilisateurs suivis par l'utilisateur connecté
 */
function getFollowedUsers (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    User.find({ _id: { $in: user.user_followed } }, { username: 1, followers: 1, tournaments: 1 }).exec((err, users) => {
      if (err) {
        return res.sendStatus(400)
      }
      return res.status(200).json(users)
    })
  })
}

/**
 * @param req : requête http
 * @param res : réponse http
 * @description : Récupère les utilisateurs suivis par l'utilisateur connecté en recherchant par nom
 */
function searchFollowedUsers (req, res) {
  const search = new RegExp('.*' + req.params.search + '.*', 'i')
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    User.find({ _id: { $in: user.user_followed }, username: { $regex: search } }, { username: 1, followers: 1, tournaments: 1 }).exec((err, users) => {
      if (err) {
        console.log(err)
        return res.sendStatus(400)
      }
      return res.status(200).json(users)
    })
  })
}

function deleteUser (req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err) {
      return res.sendStatus(400)
    }
    if (user.username !== req.params.username) {
      return res.sendStatus(403)
    }
    User.deleteOne({ username: req.params.username }).exec((err) => {
      if (err) {
        return res.sendStatus(400)
      }
      return res.sendStatus(204)
    })
  })
}

module.exports = {
  changeUsername,
  getUsers,
  getUser,
  changeEmail,
  createUser,
  updateUser,
  login,
  createToken,
  resetPassword,
  getToken,
  activateUser,
  updateProfile,
  changePassword,
  googleLogin,
  getUserById,
  logout,
  createUsers,
  search,
  getProfile,
  isLoggedProfile,
  followUser,
  isFollowed,
  unfollowUser,
  updateAvatar,
  getUserAvatar,
  getFollowedUsers,
  searchFollowedUsers,
  deleteUser
}
