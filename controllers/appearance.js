const Appearance = require('../models/appearance');
const {Model} = require("mongoose");

function insert_appearance(body) {
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

module.exports.insert = insert_appearance;

function query_appearance(body) {
    return new Promise((resolve, reject) => {
        Model.find(body)
            .then(results => {
                results.forEach((appearance) => {
                    appearance._id = null;
                });
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.query = query_appearance;