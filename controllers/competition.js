const {Model} = require("mongoose");
const fs = require("fs");
let GeneralController = require('./GeneralController');
const competitionModel = require('../models/competition');

class CompetitionController extends GeneralController {
    constructor(datasetPath) {
        super('competitions', competitionModel, String(datasetPath + 'cleaned_competitions.json'))
    }

    findByCode(DomesticLeagueCode){
        return this.model.find({domestic_league_code: DomesticLeagueCode},
            'competition_id domestic_league_code competition_name')
    }

    async getCompetitionsByIds(competitionIdList){
        return await this.model.find({competition_id: {$in: competitionIdList}},
            'competition_id competition_name img_url')
    }
}

module.exports = CompetitionController;

