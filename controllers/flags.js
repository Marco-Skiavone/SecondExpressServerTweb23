const flagsModel = require('../models/flags');
const {Model, model} = require('mongoose');
const appearanceModel = require("../models/appearance");

class FlagsController extends GeneralController{
    constructor() {
        super(flagsModel)
    }
}

module.exports = FlagsController;