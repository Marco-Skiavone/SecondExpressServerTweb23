const Flags = require('../models/flags');
const {Model, model} = require('mongoose');

function insert_flag(body) {
    return new Promise((resolve, reject) => {
        const mongo_obj = new Model(body);
        mongo_obj.save()
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.insert = insert_flag;

function query_flag(body) {
    return new Promise((resolve, reject) => {
        Model.find(body)
            .then(results => {
                results.forEach((flag) => {
                    flag._id = null;
                });
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.query = query_flag;