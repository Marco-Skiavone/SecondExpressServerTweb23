const flagsModel = require('../models/flags');
let GeneralController = require('./GeneralController')

class FlagsController extends GeneralController {
    constructor(datasetPath) {
        super('flags', flagsModel, String(datasetPath + 'cleaned_flags.json'))
    }

    getAll = async () => {
        return await this.model.find()
    }
}


module.exports = FlagsController;
