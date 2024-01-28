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

const objAppearances = new appearance(generalPath)
const objCompetitions = new competition(generalPath)
const objGameLineups = new gameLineups(generalPath)
const objPlayerValuations = new playerValuation(generalPath)
const objFlags = new flag(generalPath)

router.get('/international_competition/:domestic_league_code', async (req, res) => {
    await objCompetitions.findById(req.params.domestic_league_code)
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
router.get('/insert_mongo', async (req, res) => {
    try {
        let appearancesPromise = await objAppearances.loadDataset()
        let competitionsPromise = await objCompetitions.loadDataset()
        let gameLineupsPromise = await objGameLineups.loadDataset()
        let playerValuationsPromise = await objGameLineups.loadDataset()
        let flagsPromise = await objFlags.loadDataset()

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
    objFlags.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + objFlags.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting flags: ' + err))
})

router.get('/insert_appearances', (req, res) => {
    objAppearances.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + objAppearances.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting appearances: '+ err))
})

router.get('/insert_competitions', (req, res) => {
    objCompetitions.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + objCompetitions.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting competitions: '+ err))
})

router.get('/insert_game_lineups', (req, res) => {
    objGameLineups.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + objGameLineups.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting game lineups: '+ err))
})

router.get('/insert_player_valuations', (req, res) => {
    objPlayerValuations.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + objPlayerValuations.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting player valuations: '+ err))
})

module.exports = router;
