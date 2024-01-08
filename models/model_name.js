const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Scheme_name = new Schema({
    /** first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    dob: {type: Number},
    whatever: {type: String} */
});
const Model_name = mongoose.model('Model_name', Scheme_name);

module.exports = Model_name;
