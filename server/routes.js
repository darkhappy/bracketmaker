const express = require('express')
const userController = require('./controllers/UserController')
const tournamentController = require('./controllers/tournamentController')
const matchController = require('./controllers/matchController')
const playerController = require('./controllers/playerController')

const router = express.Router()
router
  .route('/user')
  .get(userController.getUser)
  .post(userController.createUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

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
module.exports = router
