let gameLineupsModel = require('../models/game_lineups');
const {Model} = require("mongoose");
let GeneralController = require('./GeneralController')

class GameLineupsController extends GeneralController{
    constructor() {
        super(gameLineupsModel)
    }
}

module.exports = GameLineupsController;
