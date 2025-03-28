const {Model} = require("mongoose");
const fs = require("fs");
let GeneralController = require('./GeneralController');
const competitionModel = require('../models/competition');

class CompetitionController extends GeneralController {
    constructor(datasetPath) {
        super('competitions', competitionModel, String(datasetPath + 'cleaned_competitions.json'))
    }

    findByCode(domesticLeagueCode) {
        if(domesticLeagueCode === 'null')
            domesticLeagueCode = null
        return this.model.find({domestic_league_code: domesticLeagueCode}, {_id: 0, __v: 0,
                sub_type: 0, competition_type: 0, country_name: 0})
    }

    async getCompetitionById(competitionId){
        return await this.model.find({competition_id: competitionId}, {_id: 0, __v: 0});
    }
}

module.exports = CompetitionController;

