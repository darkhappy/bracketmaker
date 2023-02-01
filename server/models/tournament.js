const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name : String,
    description : String,
    likes : Number,
    dislikes : Number,
    type : String,
    date : Date,
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;