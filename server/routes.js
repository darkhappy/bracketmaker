const express = require('express')
const userController = require('./controllers/UserController')
const tournamentController = require('./controllers/tournamentController')
const matchController = require('./controllers/matchController')
const playerController = require('./controllers/playerController')

const router = express.Router()
router
  .route('/user')
  .post(userController.createUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

router
  .route('/user/activate')
  .get(userController.activateUser)

router
    .route('/user/login')
    .post(userController.login)

router
  .route('/tournament')
  .get(tournamentController.getTournament)
  .post(tournamentController.createTournament)
  .put(tournamentController.updateTournament)
  .delete(tournamentController.deleteTournament)

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
  .put(userController.updatePassword)

module.exports = router
