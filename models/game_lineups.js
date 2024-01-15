const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemeGameLineups = new Schema({
    game_lineups_id: {type: String, required: true, max: 40},
    game_id: {type: Number, required: true},
    club_id: {type: Number, required: true},
    type: {type: String, required: true, max: 20},
    number: {type: Number, required: true},
    player_id: {type: Number, required: true},
    player_name: {type: String, required: true, max: 40},
    team_captain: {type: Boolean, required: true},
    position: {type: String, required: true, max: 20}
});

SchemeGameLineups.set('toObject', {getters: true});

const GameLineups = mongoose.model('GameLinups', SchemeGameLineups);

module.exports = GameLineups;