let gameLineupsModel = require('../models/game_lineups');
const {Model} = require("mongoose");
class GameLineupsController extends GeneralController{
    constructor() {
        super(gameLineupsModel)
    }
}

module.exports = GameLineupsController;
