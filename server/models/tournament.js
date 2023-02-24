const mongoose = require('mongoose');
const Player = require('./player');
const Match = require('./match');

const tournamentSchema = new mongoose.Schema({
    name : String,
    description : String,
    bracket_type : String,
    category : String,
    date : Date,
    visibility: String,
    location: String,
    game: String,
    players : [],
    organizer_id : String,
    matches : [Match.schema]
}, {
    versionKey: false
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
