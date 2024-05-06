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
            {sort: {date: -1}, limit: 24});
    }

    /** It retrieves the last valuation of a certain player
     * @param player_id The player ID of the player */
    getLastValuationOfPlayer = async (player_id) => {
        return await this.model.find({player_id: player_id}, {
            _id: 0,
            playerId: 1,
            market_value_eur: 1,
            date: 1
        }, {sort: {date: -1}, limit: 1});
    }

    /** It retrieves the max valuation of a certain player
     * @param player_id The player ID of the player */
    getMaxValuationOfPlayer = async (player_id) => {
        return await this.model.find({player_id: player_id}, {
            _id: 0,
            player_id: 1,
            market_value_eur: 1,
            date: 1
        }, {sort: {market_value_eur: -1}, limit: 1});
    }
}

module.exports = PlayerValuationController;
