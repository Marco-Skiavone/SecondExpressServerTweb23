let gameLineupsModel = require('../models/game_lineups');
let GeneralController = require('./GeneralController');
const {Model} = require("mongoose");

class GameLineupsController extends GeneralController {
    constructor() {
        super(gameLineupsModel)
    }
}

module.exports = GameLineupsController;
