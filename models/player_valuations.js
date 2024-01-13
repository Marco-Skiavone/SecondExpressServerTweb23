const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemePlayerValuations = new Schema({
    player_id: {type: Number},
    last_season: {type: Number},
    date: {type: Date},
    date_week: {type: Date},
    market_value_eur: {type: Number},
    current_club_id: {type: Number},
    current_dom_competition_code: {type: String}
});

SchemePlayerValuations.set('toObject', {getters: true, virtuals: true});

const PlayerValuations = mongoose.model('PlayerValuations', SchemePlayerValuations);

module.exports = PlayerValuations;