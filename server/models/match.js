const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    player_a : Participant.schema,
    player_b : Participant.schema,
    player_a_points : Number,
    player_b_points : Number,
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;