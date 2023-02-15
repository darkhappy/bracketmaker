const express = require('express')
const userController = require('./controllers/UserController')
const middleware = require('./middlewares/UserMiddleware')
const tournamentController = require('./controllers/tournamentController')
const matchController = require('./controllers/matchController')
const playerController = require('./controllers/playerController')

const router = express.Router()
router
  .route('/user')
  .get(middleware.isAuth, userController.getUser)
  .post(userController.createUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

router
  .route('/user/activate')
  .get(userController.activateUser)

router
  .route("/user/login")
  .post(userController.login)

router
  .route("/user/profile")
  .put(middleware.isAuth, userController.updateProfile);

router
  .route("/user/password")
  .put(middleware.isAuth, userController.changePassword);

router
  .route("/user/username")
  .put(middleware.isAuth, userController.changeUsername);

router
  .route("/user/email")
  .put(middleware.isAuth, userController.changeEmail);

router
  .route("/tournament")
  .get(tournamentController.getTournament)
  .post(tournamentController.createTournament)
  .put(tournamentController.updateTournament)
  .delete(tournamentController.deleteTournament);

router
  .route("/match")
  .get(matchController.getMatch)
  .post(matchController.createMatch)
  .put(matchController.updateMatch)
  .delete(matchController.deleteMatch)

router
  .route('/player')
  .get(playerController.getPlayer)
  .post(playerController.createPlayer)
  .put(playerController.updatePlayer)
  .delete(playerController.deletePlayer)

router
  .route('/token')
  .post(userController.createToken)

router
  .route('/password/:token')
  .get(userController.getToken)
  .put(userController.updatePassword)

module.exports = router
