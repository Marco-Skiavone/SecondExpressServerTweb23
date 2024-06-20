const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let competition = require("../controllers/competition")
let gameLineups = require("../controllers/game_lineups")

const {listen} = require("express/lib/application");

const competitionController = new competition(generalPath)
const gameLineupsController = new gameLineups(generalPath)

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

router.get('/insert_flags', (req, res) => {
    /* #swagger.tags = ['Load Data']
     #swagger.description = 'GET route to load flags\' dataset in MongoDB.
     To load the data place the dataset in .json format in a directory in the root of the project called \'json\''
     #swagger.responses[500] = {
         description: 'Error! Problem in inserting flags\' dataset in MongoDB'
     }
     */
    flagsController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + flagsController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting flags: ' + err))
})

router.get('/insert_appearances', (req, res) => {
    /* #swagger.tags = ['Load Data']
     #swagger.description = 'GET route to load appearances\' dataset in MongoDB.
     To load the data place the dataset in .json format in a directory in the root of the project called \'json\''
     #swagger.responses[500] = {
         description: 'Error! Problem in inserting appearances\' dataset in MongoDB'
     }
     */
    appearanceController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + appearanceController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting appearances: ' + err))
})

router.get('/insert_competitions', (req, res) => {
    /* #swagger.tags = ['Load Data']
     #swagger.description = 'GET route to load competitions\' dataset in MongoDB.
     To load the data place the dataset in .json format in a directory in the root of the project called \'json\''
     #swagger.responses[500] = {
         description: 'Error! Problem in inserting competitions\' dataset in MongoDB'
     }
     */
    competitionController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + competitionController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting competitions: ' + err))
})

router.get('/insert_game_lineups', (req, res) => {
    /* #swagger.tags = ['Load Data']
     #swagger.description = 'GET route to load game_lineups\' dataset in MongoDB.
     To load the data place the dataset in .json format in a directory in the root of the project called \'json\''
     #swagger.responses[500] = {
         description: 'Error! Problem in inserting game_lineups\' dataset in MongoDB'
     }
     */
    gameLineupsController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + gameLineupsController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting game lineups: ' + err))
})

router.get('/insert_player_valuations', (req, res) => {
    /* #swagger.tags = ['Load Data']
     #swagger.description = 'GET route to load player_valuations\' dataset in MongoDB.
     To load the data place the dataset in .json format in a directory in the root of the project called \'json\''
     #swagger.responses[500] = {
         description: 'Error! Problem in inserting player_valuations\' dataset in MongoDB'
     }
     */
    playerValuationController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + playerValuationController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting player valuations: ' + err))
})

module.exports = router;
