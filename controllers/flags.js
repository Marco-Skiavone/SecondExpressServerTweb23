const flagsModel = require('../models/flags');
let GeneralController = require('./GeneralController')

class FlagsController extends GeneralController {
    constructor(datasetPath) {
        super('flags', flagsModel, String(datasetPath + 'cleaned_flags.json'))
    }

    getAll = async () => {
        return await this.model.find({}, {_id: 0, __v: 0})
    }

    getByCode = async (code) => {
        return await this.model.find({domestic_league_code: code}, {_id: 0, domestic_league_code: 0, __v: 0})
    }
}


module.exports = FlagsController;
