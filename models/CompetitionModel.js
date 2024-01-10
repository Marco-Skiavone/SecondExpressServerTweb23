const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemeCompetition = new Schema({
    competition_id: {type: String},
    competition_name: {type: String},
    sub_type: {type: String},
    competition_type: {type: String},
    country_name: {type: String},
    domestic_league_code: {type: String},
    competition_url: {type: String}
    /** first_name: {type: String, required: true, max: 100},
     family_name: {type: String, required: true, max: 100},
     dob: {type: Number},
     whatever: {type: String} */
});

const CompetitionModel = mongoose.model('CompetitionModel', SchemeCompetition);

module.exports = CompetitionModel;