const Tournament = require('../models/tournament')
const User = require('../models/User')
const moment = require("moment");

function getTournament (req, res) {
  // todo: a faire
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
    const { name, descripton, bracket_type, category, date, visibility, location, game, players} = req.body
    if (moment(date, "MM/DD/YYYY", false).isValid())
        return res.sendStatus(401).json({message: 'date non valide'})
    if (visibility !== 'public' && visibility !== 'private' && visibility !== 'unlisted')
        return res.sendStatus(401).json({message: 'visibilité non valide'})
    if (bracket_type !== 'Simple' && bracket_type !== 'Double' && bracket_type !== 'Round Robin')
        return res.sendStatus(401).json({message: 'type de tournoi non valide'})

    Tournament.findById(req.body._id).exec((err, tournament) => {
        tournament.name = name
        tournament.description = descripton
        tournament.bracket_type = bracket_type
        tournament.category = category
        tournament.date = date
        tournament.visibility = visibility
        tournament.location = location
        tournament.game = game
        tournament.players = players

        tournament.save().then(() => {
            return res.status(204)
        }).catch((err) => {
            return res.status(401).json(err)
        })
    })
}

async function deleteTournament(req, res) {
    const user = await User.findById(req.payload.id).exec()
    if (!user)
        return res.status(401).json({message: 'id organisateur non valide'})

    let id = req.query.id
    Tournament.findOneAndDelete({_id : id, organizer_id : req.payload.id}).exec((error, result) => {
        if (error) {
            return res.status(401);
        }
        return res.sendStatus(204);
    });
}

module.exports = { getTournament, createTournament, deleteTournament, updateTournament }
