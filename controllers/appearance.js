const {Model} = require("mongoose");
const fs = require('fs');
const MILLISECOND_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365.25;
let GeneralController = require('./GeneralController');
let appearanceModel = require('../models/appearance');

class AppearanceController extends GeneralController {
    constructor(datasetPath) {
        super('appearances', appearanceModel, String(datasetPath + 'cleaned_appearances.json'))
    }

    /** Retrieves the appearance of a certain player in the last 2 years
     * @param player_id The player ID of the player */
    getLastPlayerAppearances = async (player_id) => {
        let appearances = await this.model.find({player_id: player_id}, {
            _id: 0,
            appearance_id: 0,
            player_id: 0,
            player_name: 0,
            player_current_club_id: 0,
            __v: 0
        }, {sort: {game_date: -1}});

        appearances.forEach((appearance, index) => {
            const diffDate = Math.abs(appearances[0].game_date - appearance.game_date);
            const diffYear = diffDate / MILLISECOND_IN_A_YEAR;

            if (diffYear > 2) {
                appearances.splice(index, 1);
            }
        });

        return appearances;
    }

    getGameAppearances = async (game_id) => {
        return await this.model.find({game_id: game_id}, {
            _id: 0,
            appearance_id: 0,
            game_id: 0,
            game_date: 0,
            competition_id: 0,
            player_current_club_id: 0,
            __v: 0
        })
    }
}

module.exports = AppearanceController;
