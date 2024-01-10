// The controller must import the model(s) it works on
let Author = require('../models/CompetitionModel');
// Remember to export the function outside the module
exports.model_name_operations = function(req, res) {
    /** Usually operations on list of elements from the database !! */
    // Here we will make operations on the database and return the data
    // for example here we could have a find operation to retrieve the authors list
    res.send('NOT IMPLEMENTED: model_name_operations');
};
