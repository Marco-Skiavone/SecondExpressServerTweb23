const mongoose = require('mongoose');
const {Model} = require("mongoose");
const Schema = mongoose.Schema;

const SchemeFlags = new Schema({
    domestic_league_code: {type: String, max: 5, required: true},
    country_name: {type: String, max: 20, required: true},
    flag_url: {type: String, max: 160, required: true}
});

SchemeFlags.set('toObject', {getters: true});
//SchemeFlags.schema.bufferCommands = false;
const Flags = mongoose.model('Flags', SchemeFlags);

module.exports = Flags;
function insert(body) {
    return new Promise((resolve, reject) => {
        const mongoObj = new Model(body);
        mongoObj.save()
            .then(results => {
                resolve(results);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports.insert = insert;
