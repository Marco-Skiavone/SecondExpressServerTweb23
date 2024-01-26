const appearanceModel = require('../models/appearance');
let GeneralController = require('./GeneralController');
const {Model} = require("mongoose");

class AppearanceController extends GeneralController {
    constructor() {
        super(appearanceModel)
    }
}

module.exports = AppearanceController;
