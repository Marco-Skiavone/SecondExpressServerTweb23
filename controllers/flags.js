const flagsModel = require('../models/flags');
let GeneralController = require('./GeneralController')
const {Model} = require('mongoose');

class FlagsController extends GeneralController {
    constructor(datasetPath) {
        super('flags', flagsModel, String(datasetPath + 'cleaned_flags.json'))
    }
}

module.exports = FlagsController;
