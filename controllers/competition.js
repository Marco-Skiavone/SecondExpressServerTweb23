const competitionModel = require('../models/competition');
const {Model} = require("mongoose");
let GeneralController = require('./GeneralController')

class CompetitionController extends GeneralController {
    constructor() {
        super(competitionModel)
    }
}

module.exports = CompetitionController;

