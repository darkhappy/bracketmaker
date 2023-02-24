const Tournament = require('../models/tournament')
const User = require('../models/User')
const moment = require("moment");
const middleware = require("../middlewares/UserMiddleware");
const bcrypt = require("bcrypt");
const Match = require("../models/match");

function getTournament (req, res) {
  const _id = req.query._id
  Tournament.findOne({ _id }).exec((err, tournament) => {
    if (err || !tournament) {
      return res.status(401).json({ error: 'Tournament not found' })
    }
    return res.status(201).json({ tournament })
  })
}

async function createTournament(req, res) {
    const user = await User.findById(req.payload.id).exec()
    if (!user)
        return res.status(401).json({message: 'id organisateur non valide'})
    if (moment(req.body.date, "MM/DD/YYYY", false).isValid())
        return res.sendStatus(401).json({message: 'date non valide'})
    if (req.body.visibility !== 'public' && req.body.visibility !== 'private' && req.body.visibility !== 'unlisted')
        return res.sendStatus(401).json({message: 'visibilité non valide'})
    if (req.body.bracket_type !== 'Simple' && req.body.bracket_type !== 'Double' && req.body.bracket_type !== 'Round Robin')
        return res.sendStatus(401).json({message: 'type de tournoi non valide'})

    const tournament = new Tournament({
        name : req.body.name,
        description : req.body.description,
        bracket_type : req.body.bracket_type,
        category : req.body.category,
        date : req.body.date,
        visibility: req.body.visibility,
        location: req.body.location,
        game: req.body.game,
        players : req.body.players,
        organizer_id : req.payload.id
    })

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
