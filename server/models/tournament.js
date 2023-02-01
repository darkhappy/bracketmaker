const mongoose = require('mongoose');
const Player = require('./player');
const Match = require('./match');

const tournamentSchema = new mongoose.Schema({
    name : String,
    description : String,
    bracket_type : String,
    category : String,
    date : Date,
    likes : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    dislikes : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    players : [Player.schema],
    matches : [Match.schema]
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;