const mongoose = require('mongoose');
const Player = require('./player');

const matchSchema = new mongoose.Schema({
    player_a : Player.schema,
    player_b : Player.schema,
    player_a_points : Number,
    player_b_points : Number,
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;