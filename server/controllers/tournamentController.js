const Tournament = require('../models/tournament')

function getTournament (req, res) {
  // todo: a faire
}

function createTournament (req, res) {
    let tournament = new Tournament(req.body);

    tournament.save().then(() => {
        return res.sendStatus(204);
    }).catch(() => {
        return res.sendStatus(401)
    });
}

function updateTournament (req, res) {
  // todo : a faire
}

function deleteTournament (req, res) {
  // todo : a faire
}

module.exports = { getTournament, createTournament, deleteTournament, updateTournament }
