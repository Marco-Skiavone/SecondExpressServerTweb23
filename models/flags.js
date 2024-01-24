const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const scheme_flags = new Schema({
    domestic_league_code: {type: String, max: 5, required: true},
    country_name: {type: String, max: 20, required: true},
    flag_url: {type: String, max: 160, required: true}
});

scheme_flags.set('toObject', {getters: true});
const Flags = mongoose.model('Flags', scheme_flags);
module.exports = Flags;