const express = require('express')
const userController = require('./controllers/usercontroller')
const middleware = require('./middlewares/UserMiddleware')
const tournamentController = require('./controllers/TournamentController')
const matchController = require('./controllers/MatchController')
const playerController = require('./controllers/PlayerController')
const uploadController = require('./controllers/UploadController')

const router = express.Router()

router.route('/createUsers').get(userController.createUsers)

router
  .route('/user')
  .get(middleware.isAuth, userController.getUser)
  .post(userController.createUser)
  .put(userController.updateUser)

router
  .route('/getUser/:_id')
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
  .put(middleware.isAuth, userController.updateProfile)

router
  .route('/user/getProfile/:username')
  .get(userController.getProfile)

router
  .route('/user/avatar')
  .post(middleware.isAuth, uploadController.uploadAvatar)
router
  .route('/user/avatar/:username')
  .get(middleware.isAuth, userController.getUserAvatar)
router
  .route('/user/update')
  .put(userController.updateUser)

router
  .route('/user/password')
  .put(middleware.isAuth, userController.changePassword)

router
  .route('/user/username')
  .put(middleware.isAuth, userController.changeUsername)

router
  .route('/user/email')
  .put(middleware.isAuth, userController.changeEmail)

router
  .route('/users')
  .get(userController.getUsers)

router
  .route('/users/search/:search')
  .get(userController.search)

router
  .route('/user/logout')
  .post(middleware.isAuth, userController.logout)

router
  .route('/user/isLoggedProfile/:username')
  .get(middleware.isAuth, userController.isLoggedProfile)

router
  .route('/user/follow/:username')
  .get(middleware.isAuth, userController.isFollowed)
  .post(middleware.isAuth, userController.followUser)
  .delete(middleware.isAuth, userController.unfollowUser)

router
  .route('/user/followed')
  .get(middleware.isAuth, userController.getFollowedUsers)

router
  .route('/user/followed/search/:search')
  .get(middleware.isAuth, userController.searchFollowedUsers)
router
  .route('/tournament')
  .get(tournamentController.getTournament)
  .post(middleware.isAuth, tournamentController.createTournament)
  .put(middleware.isAuth, tournamentController.updateTournament)
  .delete(middleware.isAuth, tournamentController.deleteTournament)

router
  .route('/tournament/follow/:id')
  .get(middleware.isAuth, tournamentController.isFollowed)
  .post(middleware.isAuth, tournamentController.followTournament)
  .delete(middleware.isAuth, tournamentController.unfollowTournament)

router
  .route('/tournament/from/:id')
  .get(tournamentController.getTournamentsByOrganizerId)

router
  .route('/tournament/followed')
  .get(middleware.isAuth, tournamentController.getFollowedTournaments)

router
  .route('/tournament/followed/search/:search')
  .get(middleware.isAuth, tournamentController.searchFollowedTournaments)
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
