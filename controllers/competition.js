const competitionModel = require('../models/competition');
const {Model} = require("mongoose");

class CompetitionController extends GeneralController {
    constructor() {
        super(competitionModel)
    }
}

module.exports = CompetitionController;

