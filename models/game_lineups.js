const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemeGameLineups = new Schema({
    game_lineups_id: {type: String},
    game_id: {type: Number},
    club_id: {type: Number},
    type: {type: String},
    number: {type: Number},
    player_id: {type: Number},
    player_name: {type: String},
    team_captain: {type: Boolean},
    position: {type: String}
});

SchemeGameLineups.set('toObject', {getters: true, virtuals: true});

const GameLineups = mongoose.model('GameLinups', SchemeGameLineups);

module.exports = GameLineups;