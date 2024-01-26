const appearanceModel = require('../models/appearance');
const {Model} = require("mongoose");
let GeneralController = require('./GeneralController')

class AppearanceController extends GeneralController{
    constructor() {
        super(appearanceModel)
    }
}

module.exports = AppearanceController;
