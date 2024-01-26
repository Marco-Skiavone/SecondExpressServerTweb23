const flagsModel = require('../models/flags');
let GeneralController = require('./GeneralController')
const {Model} = require('mongoose');

class FlagsController extends GeneralController {
    constructor() {
        super(flagsModel)
    }
}

module.exports = FlagsController;
