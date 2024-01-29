const {Model} = require("mongoose");
const fs = require("fs");
let GeneralController = require('./GeneralController');
const competitionModel = require('../models/competition');

class CompetitionController extends GeneralController {
    constructor(datasetPath) {
        super('competitions', competitionModel, String(datasetPath + 'cleaned_competitions.json'))
    }

    findById(domestic_league_code){
        return this.model.find({domestic_league_code: domestic_league_code},
            'competition_id domestic_league_code competition_name')
    }
}

module.exports = CompetitionController;

