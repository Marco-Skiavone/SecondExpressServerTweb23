let Game_lineups = require('../models/game_lineups');
const {Model} = require("mongoose");

function insert_game_lineups(body) {
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

module.exports.insert = insert_game_lineups;

function query_game_lineups(body) {
    return new Promise((resolve, reject) => {
        Model.find(body)
            .then(results => {
                results.forEach((game_lineups) => {
                    game_lineups._id = null;
                });
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.query = query_game_lineups;
