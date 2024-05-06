const {Model} = require("mongoose");
const fs = require('fs');
let GeneralController = require('./GeneralController');
let appearanceModel = require('../models/appearance');

class AppearanceController extends GeneralController {
    constructor(datasetPath) {
        super('appearances', appearanceModel, String(datasetPath + 'cleaned_appearances.json'))
    }

    /** Retrieves every appearance of a certain player
     * @param player_id The player ID of the player */
    getEveryPlayerAppearances = async (player_id) => {
        return await this.model.find({player_id: player_id}, {
            _id: 0,
            player_id: 1,
            game_id: 1,
            game_date: 1,
            player_name: 1,
            competition_id: 1,
            player_club_id: 1,
            player_current_club_id: 1,
            yellow_cards: 1,
            red_cards: 1,
            goals: 1,
            assists: 1,
            minutes_played: 1
        }, {sort: {game_date: -1}})
    }
}

module.exports = AppearanceController;
