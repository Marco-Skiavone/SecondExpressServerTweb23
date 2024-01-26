let playerValuationsModel = require('../models/player_valuations');
let GeneralController = require('./GeneralController');
const {Model} = require("mongoose");

class PlayerValuationController extends GeneralController {
    constructor() {
        super(playerValuationsModel)
    }
}

module.exports = PlayerValuationController;
