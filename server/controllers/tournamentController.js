const Tournament = require('../models/tournament')
const User = require('../models/User')
const moment = require("moment");

function getTournament (req, res) {
  // todo: a faire
}

async function createTournament(req, res) {
    const user = await User.findById(req.body.organiserID).exec()
    if (!user)
        return res.status(409).json({message: 'id organisateur non valide'})
    if (!moment("06/22/2015", "MM/DD/YYYY", true).isValid())
        return res.sendStatus(401).json({message: 'date non valide'})
    if (req.body.visibility !== 'public' && req.body.visibility !== 'private' && req.body.visibility !== 'unlisted')
        return res.sendStatus(401).json({message: 'visibilité non valide'})
    if (req.body.bracket_type !== 'Simple' && req.body.bracket_type !== 'Double' && req.body.bracket_type !== 'Round Robin')
        return res.sendStatus(401).json({message: 'type de tournoi non valide'})

    let tournament = new Tournament(req.body)
    tournament.save().then(() => {
        return res.sendStatus(204)
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
