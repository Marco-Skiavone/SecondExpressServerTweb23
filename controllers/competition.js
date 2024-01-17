// The controller must import the model(s) it works on
const Competition = require('../models/competition');
const {Model} = require("mongoose");
// Remember to export the function outside the module
//exports.CompetitionOperations = function(req, res) {
/** Usually operations on list of elements from the database !! */
// Here we will make operations on the database and return the data
// for example here we could have a find operation to retrieve the authors list
// res.send('NOT IMPLEMENTED: model_name_operations');
//};
function insert_competition(body) {
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

module.exports.insert = insert_competition;

function query_competition(body) {
    return new Promise((resolve, reject) => {
        Model.find(body)
            .then(results => {
                results.forEach((competition) => {
                    competition._id = null;
                });
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports.query = query_competition;