const express = require('express')
const userController = require('./controllers/usercontroller')
const middleware = require('./middlewares/UserMiddleware')
const tournamentController = require('./controllers/TournamentController')
const matchController = require('./controllers/MatchController')
const playerController = require('./controllers/PlayerController')
const uploadController = require('./controllers/UploadController')

const router = express.Router()
router
  .route('/user')
  .get(middleware.isAuth, userController.getUser)
  .post(userController.createUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

router
  .route('/user/getOneUser/:_id')
  .get(userController.getUserById)

router
  .route('/user/activate')
  .get(userController.activateUser)

router
  .route('/user/login')
  .post(userController.login)

router
  .route('/google')
  .post(userController.googleLogin)

router
  .route('/user/profile')
  .put(middleware.isAuth, userController.updateProfile);

router
    .route('/user/avatar')
    .put(middleware.isAuth, uploadController.uploadAvatar);
router
    .route('/user/update')
    .put(userController.updateUser);

router
  .route('/user/password')
  .put(middleware.isAuth, userController.changePassword);

router
  .route('/user/username')
  .put(middleware.isAuth, userController.changeUsername);

router
  .route('/user/email')
  .put(middleware.isAuth, userController.changeEmail);

router
    .route("/user/logout")
    .post(middleware.isAuth, userController.logout)

router
  .route('/tournament')
  .get(tournamentController.getTournament)
  .post(tournamentController.createTournament)
  .put(tournamentController.updateTournament)
  .delete(tournamentController.deleteTournament);

router
  .route('/match')
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
  .put(userController.resetPassword)

module.exports = router
