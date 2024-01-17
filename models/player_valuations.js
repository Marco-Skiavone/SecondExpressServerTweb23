const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemePlayerValuations = new Schema({
    player_id: {type: Number, required: true},
    last_season: {type: Number, required: true},
    date: {type: Date, required: true},
    date_week: {type: Date, required: true},
    market_value_eur: {type: Number, required: true},
    current_club_id: {type: Number, required: true},
    current_dom_competition_code: {type: String, required: true, max: 5}
});

SchemePlayerValuations.set('toObject', {getters: true});

const PlayerValuations = mongoose.model('PlayerValuations', SchemePlayerValuations);

module.exports = PlayerValuations;