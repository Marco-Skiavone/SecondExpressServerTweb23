const {Model} = require("mongoose");
const fs = require("fs");
let GeneralController = require('./GeneralController');
let playerValuationsModel = require('../models/player_valuations');

class PlayerValuationController extends GeneralController {
    constructor(datasetPath) {
        super('player valuations', playerValuationsModel, String(datasetPath + 'cleaned_player_valuations.json'))
    }
}

module.exports = PlayerValuationController;
