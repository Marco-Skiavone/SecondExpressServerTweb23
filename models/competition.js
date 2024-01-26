const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemeCompetition = new Schema({
    competition_id: {type: String, required: true, max: 5},
    competition_name: {type: String, required: true, max: 50},
    sub_type: {type: String, required: true, max: 50},
    competition_type: {type: String, required: true, max: 20},
    country_name: {type: String, max: 20},
    domestic_league_code: {type: String, max: 5}
    /** first_name: {type: String, required: true, max: 100},
     family_name: {type: String, required: true, max: 100},
     dob: {type: Number},
     whatever: {type: String} */
});

SchemeCompetition.set('toObject', {getters: true});

const competition = mongoose.model('Competition', SchemeCompetition);

module.exports = competition;