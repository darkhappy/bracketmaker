const Tournament = require('../models/tournament')

function getTournament (req, res) {
  const _id = req.query._id

  Tournament.findOne({ _id }).exec((err, tournament) => {
    if (err || !tournament) {
      return res.status(401).json({ error: 'Tournament not found' })
    }
    return res.status(201).json({ tournament })
  })
}

function createTournament (req, res) {
  const tournament = new Tournament(req.body)

  tournament.save().then(() => {
    return res.sendStatus(204)
  }).catch(() => {
    return res.sendStatus(401).json({ error: 'Error while creating tournament' })
  })
}

function updateTournament (req, res) {
  // todo : a faire
}

function deleteTournament (req, res) {
  // todo : a faire
}

module.exports = { getTournament, createTournament, deleteTournament, updateTournament }
