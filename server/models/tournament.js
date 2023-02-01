const mongoose = require('mongoose');
const Player = require('./player');
const Match = require('./match');

const tournamentSchema = new mongoose.Schema({
    name : String,
    description : String,
    type : String,
    date : Date,
    likes : [Player.schema],
    dislikes : [Player.schema],
    players : [Player.schema],
    matches : [Match.schema]
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;