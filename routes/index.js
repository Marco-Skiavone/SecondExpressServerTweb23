const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let competition = require("../controllers/competition")
let gameLineups = require("../controllers/game_lineups")
let appearance = require("../controllers/appearance")
let playerValuation = require("../controllers/player_valuations")
let flag = require("../controllers/flags")

const {listen} = require("express/lib/application");

const competitionController = new competition(generalPath)
const gameLineupsController = new gameLineups(generalPath)
const appearanceController = new appearance(generalPath)
const playerValuationController = new playerValuation(generalPath)
const flagsController = new flag(generalPath)

console.log('secondExpressServer started!')

router.get('/insert_mongo', async (req, res) => {
    /* #swagger.tags = ['Load Data']
     #swagger.description = 'GET route to load all the dataset in MongoDB.
     To load the data place the dataset in .json format in a directory in the root of the project called \'json\''
     #swagger.responses[500] = {
         description: 'Error! Problem in inserting all the dataset in MongoDB'
     }
     */
    try {
        let appearancesPromise = appearanceController.loadDataset()
        let competitionsPromise = competitionController.loadDataset()
        let gameLineupsPromise = gameLineupsController.loadDataset()
        let playerValuationsPromise = playerValuationController.loadDataset()
        let flagsPromise = flagsController.loadDataset()

        Promise.all([competitionsPromise, gameLineupsPromise, playerValuationsPromise, appearancesPromise, flagsPromise])
            .then(response => {
                res.status(200).send('Completed "/insert_mongo" route.')
            })
            .catch(err => {
                res.status(500).send('Error occurred during insertion of all datasets in MongoDB.')
            })
    } catch (err) {
        res.status(500).send('Error: ' + err)
    }
})

module.exports = router;
