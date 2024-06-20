const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let gameLineups = require("../controllers/game_lineups")
const gameLineupsController = new gameLineups(generalPath)

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

module.exports = router;
