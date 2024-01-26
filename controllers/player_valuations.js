let playerValuationsModel = require('../models/player_valuations');
const {Model} = require("mongoose");
let GeneralController = require('./GeneralController')

class PlayerValuationController extends GeneralController{
    constructor() {
        super(playerValuationsModel)
    }
}

module.exports = PlayerValuationController;
