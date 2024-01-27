const {Model} = require("mongoose");
const fs = require('fs')
let GeneralController = require('./GeneralController');
let gameLineupsModel = require('../models/game_lineups');
const generalPath = '../json/'

class GameLineupsController extends GeneralController {
    constructor(datasetPath) {
        super('game lineups', gameLineupsModel, generalPath + '/game_lineups.json')

    }

    async loadDataset(){
        if (await this.isEmpty()) {
            try {
                await this.uploadChunks()
                    .then(() => {
                        console.log('Successfully loaded', this.name, 'dataset')
                    })
                    .catch(() => {
                        console.log('Error occurred while loading', this.name, 'dataset')
                    })
            } catch(err) {
                console.log("Failed to load " + this.name + ": json not found.\n")
            }
        } else {
            console.log(this.name, "wasn't empty!");
        }
    }
}

module.exports = GameLineupsController;
