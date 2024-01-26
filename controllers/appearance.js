const appearanceModel = require('../models/appearance');
const {Model} = require("mongoose");

class AppearanceController extends GeneralController{
    constructor() {
        super(appearanceModel)
    }
}

module.exports = AppearanceController;
