const mongoose = require('mongoose');
const {Model} = require("mongoose");
const Schema = mongoose.Schema;

const SchemeAppearance = new Schema({
    appearance_id:{type: String, required: true},
    game_id:{type: Number, required: true},
    player_id:{type: Number, required: true},
    game_date:{type: Date, required: true},
    player_name:{type: String, required: true},
    competition_id:{type: String, required: true},
    player_club_id:{type: Number, required: true},
    player_current_club_id:{type: Number, required: true},
    yellow_cards:{type: Number, required: true},
    red_cards:{type: Boolean, required: true},
    goals:{type: Number, required: true},
    assists:{type: Number, required: true},
    minutes_played:{type: Number, required: true}
});

SchemeAppearance.set('toObject', {getters: true});
const Appearance = mongoose.model('Appearance', SchemeAppearance);

module.exports = Appearance;

function insert(body) {
    return new Promise((resolve, reject) => {
        const mongoObj = new Model(body);
        mongoObj.save()
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.insert = insert;
