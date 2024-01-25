const model = require('../models/appearance');
const {Model} = require("mongoose");

function isEmpty() {
    if(model.findOne(undefined, undefined, undefined))
        return false
    else
        return true
}

async function pushDataset(dataset) {
    return model.insertMany(dataset)
}