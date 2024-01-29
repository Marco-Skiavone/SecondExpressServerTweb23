const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let appearance = require("../controllers/appearance")
let competition = require("../controllers/competition")
let gameLineups = require("../controllers/game_lineups")
let playerValuation = require("../controllers/player_valuations")
let flag = require("../controllers/flags")

const appearanceController = new appearance(generalPath)
const competitionController = new competition(generalPath)
const gameLineupsController = new gameLineups(generalPath)
const playerValuationController = new playerValuation(generalPath)
const flagsController = new flag(generalPath)

router.get('/international_competition/:domestic_league_code', async (req, res) => {
    await competitionController.findById(req.params.domestic_league_code)
        .then(competitions => {
            if(competitions.length > 0)
                res.status(200).end(competition)
            else
                res.status(404).end('Competition by code not found!')
        })
        .catch(err => {
            res.status(500).end('Error: find_competitions_by_code')
        })
});


router.get('/flags/get_all', async (req, res)=>{
    flagsController.getAll()
        .then(flags => {
            if (flags.length > 0) {
                res.status(200).json(flags)
            } else {
                res.status(404).send('Something goes wrong')
            }
        })
        .catch(error => {
            console.error('Error fetching flags database', error);
            res.status(500).send('Internal server error')
        })
})
router.get('/insert_mongo', async (req, res) => {
    try {
        let appearancesPromise =  appearanceController.loadDataset()
        let competitionsPromise =  competitionController.loadDataset()
        let gameLineupsPromise =  gameLineupsController.loadDataset()
        let playerValuationsPromise =  playerValuationController.loadDataset()
        let flagsPromise =  flagsController.loadDataset()

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
    flagsController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + flagsController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting flags: ' + err))
})

router.get('/insert_appearances', (req, res) => {
    appearanceController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + appearanceController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting appearances: '+ err))
})

router.get('/insert_competitions', (req, res) => {
    competitionController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + competitionController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting competitions: '+ err))
})

router.get('/insert_game_lineups', (req, res) => {
    gameLineupsController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + gameLineupsController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting game lineups: '+ err))
})

router.get('/insert_player_valuations', (req, res) => {
    playerValuationController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + playerValuationController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting player valuations: '+ err))
})

module.exports = router;
