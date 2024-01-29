const {Model} = require("mongoose");
const fs = require("fs");
let GeneralController = require('./GeneralController');
const competitionModel = require('../models/competition');

class CompetitionController extends GeneralController {
    constructor(datasetPath) {
        super('competitions', competitionModel, String(datasetPath + 'cleaned_competitions.json'))
    }

    findByCode(domestic_league_code){
    }
}

module.exports = CompetitionController;

