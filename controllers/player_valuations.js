const {Model} = require("mongoose");
const fs = require("fs");
let GeneralController = require('./GeneralController');
let playerValuationsModel = require('../models/player_valuations');

class PlayerValuationController extends GeneralController {
    constructor(datasetPath) {
        super('player valuations', playerValuationsModel, String(datasetPath + 'cleaned_player_valuations.json'))
    }

    /** It retrieves the **last 24** players that had a valuation,
     * then it sorts them by the date. */
    getLastByValuation = async () => {
        return await this.model.find({}, {_id: 0, player_id: 1, market_value_eur: 1},
            {sort: {date: - 1}, limit: 24});
    }
}

module.exports = PlayerValuationController;
