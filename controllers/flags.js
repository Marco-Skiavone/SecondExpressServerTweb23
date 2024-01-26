const flagsModel = require('../models/flags');
const {Model, model} = require('mongoose');
let GeneralController = require('./GeneralController')

class FlagsController extends GeneralController{
    constructor() {
        super(flagsModel)
    }
}

module.exports = FlagsController;