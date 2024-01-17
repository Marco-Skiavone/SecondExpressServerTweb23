let player_valuations = require('../models/player_valuations');
const {Model} = require("mongoose");

function insert_player_valuation(body) {
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

module.exports.insert = insert_player_valuation;

function query_player_valuation(body) {
    return new Promise((resolve, reject) => {
        Model.find(body)
            .then(results => {
                results.forEach((player_valuation) => {
                    player_valuation._id = null;
                });
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    })
}

module.exports.query = query_player_valuation;