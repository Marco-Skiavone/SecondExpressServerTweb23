const {Model} = require("mongoose");
const fs = require('fs');
let GeneralController = require('./GeneralController');
let gameLineupsModel = require('../models/game_lineups');

class GameLineupsController extends GeneralController {
    constructor(datasetPath) {
        super('game lineups', gameLineupsModel, datasetPath + 'cleaned_game_lineups.json')
    }
}

module.exports = GameLineupsController;
