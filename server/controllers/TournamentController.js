const Tournament = require('../models/tournament')
const User = require('../models/User')
const moment = require("moment");
const middleware = require("../middlewares/UserMiddleware");
const bcrypt = require("bcrypt");
const Match = require("../models/match");

function getTournament (req, res) {
  const _id = req.query._id
  console.log(_id)
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
        name: req.body.name,
        description: req.body.description,
        bracket_type: req.body.bracket_type,
        category : req.body.category,
        date : req.body.date,
        visibility: req.body.visibility,
        location: req.body.location,
        game: req.body.game,
        players: req.body.players,
        followers: [],
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

function followTournament(req, res) {
  Tournament.findById(req.params.id).exec((err, tournament) => {
    User.findById(req.payload.id).exec((err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'User not found' })
      } 
      if (err || !tournament) {
        return res.status(401).json({ error: 'Tournament not found' })
      }

      tournament.followers.push(req.payload.id)
      tournament.save().then(() => {
        user.subscriptions.push(tournament._id)
        user.save().then(() => {
          return res.sendStatus(204)
        }).catch(() => {
          return res.sendStatus(401)
        });
      }).catch(() => {
        return res.sendStatus(401)
      });  
    })
  })
}

function unfollowTournament(req, res) {
  Tournament.findById(req.params.id).exec((err, tournament) => {
    User.findById(req.payload.id).exec((err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'User not found' })
      }
      if (err || !tournament) {
        return res.status(401).json({ error: 'Tournament not found' })
      }
      const index = tournament.followers.indexOf(user._id);
      if (index > -1) { 
        tournament.followers.splice(index, 1); 
      }
      tournament.save().then(() => {
        const index = user.subscriptions.indexOf(tournament._id);
        if (index > -1) {
          user.subscriptions.splice(index, 1);
        }
        user.save().then(() => {
          return res.sendStatus(204)
        }).catch(() => {
          return res.sendStatus(401)
        });
      }).catch(() => {
        return res.sendStatus(401)
      });
    })
  })
}

function isFollowed(req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'User not found' })
    } 
    if (user.subscriptions.includes(req.params.id)) {
      return res.status(201).json(true)
    } else {
      return res.status(201).json(false)
    }
  })
}

function getFollowedTournaments(req, res) {

}

/*function searchTournament(req, res) {
  User.findById(req.payload.id).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'User not found' })
    } 
    let search = new RegExp('.*' + req.params.search + '.*', 'i')
    user.subscriptions = user.subscriptions.filter(subscription => subscription === search);
    return res.status(201).json({ user.subscriptions })
  }
} */
module.exports = { getTournament, createTournament, deleteTournament, updateTournament, followTournament, unfollowTournament, isFollowed, getFollowedTournaments/*searchTournament */}
