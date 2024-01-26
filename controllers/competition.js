const competitionModel = require('../models/competition');
let GeneralController = require('./GeneralController');
const {Model} = require("mongoose");

class CompetitionController extends GeneralController {
    constructor() {
        super(competitionModel)
    }
}

module.exports = CompetitionController;

