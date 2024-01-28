const {Model} = require("mongoose");
const fs = require('fs');
let GeneralController = require('./GeneralController');
let appearanceModel = require('../models/appearance');

class AppearanceController extends GeneralController {
    constructor(datasetPath) {
        super('appearances', appearanceModel, String(datasetPath + 'cleaned_appearances.json'))
    }
}

module.exports = AppearanceController;
