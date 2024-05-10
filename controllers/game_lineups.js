const {Model} = require("mongoose");
const fs = require('fs');
let GeneralController = require('./GeneralController');
let gameLineupsModel = require('../models/game_lineups');

class GameLineupsController extends GeneralController {
    constructor(datasetPath) {
        super('game lineups', gameLineupsModel, datasetPath + 'cleaned_game_lineups.json')
    }

    /** It retrieves the lineups of a certain game and a certain club.
     *
     * NOTE: for the element with type = 'substitute' it's a good thing
     * if you check the order of the substitution during the game in the sql database
     * @param game_id The ID of the game
     * @param club_id The ID of the club*/
    getGameLineupsByGameAndClub = async (game_id, club_id) => {
        return await this.model.find({game_id: game_id, club_id: club_id}, {
            _id: 0,
            game_id: 0,
            club_id: 0,
            game_lineups_id: 0,
            __v: 0
        }, {sort: {type: 1}})
    }
}

module.exports = GameLineupsController;
