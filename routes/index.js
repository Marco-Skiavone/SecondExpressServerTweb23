const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const datasetPath = './json/';

const appearance = require("../controllers/appearance")
const competition = require("../controllers/competition")
const gameLineups = require("../controllers/game_lineups")
const playerValuation = require("../controllers/player_valuations")
const flag = require("../controllers/flags")

let appearanceDict = {
    'name': 'appearance',
    'controller': new appearance(),
    'dataset': datasetPath + 'cleaned_appearances.json'
}

let competitionDict = {
    'name': 'competition',
    'controller': new competition,
    'dataset': datasetPath + 'cleaned_competitions.json'
}

let gameLineupsDict = {
    'name': 'game lineups',
    'controller': new gameLineups,
    'dataset': datasetPath + 'cleaned_game_lineups.json'
}

let playerValuationDict = {
    'name': 'player valuation',
    'controller': new playerValuation,
    'dataset': datasetPath + 'cleaned_player_valuations.json'
}

let flagDict = {
    'name': 'flags',
    'controller': new flag,
    'dataset': datasetPath + 'flags.json'
}
router.get('/international_competition/:domestic_league_code', async (req, res) => {
    const domestic_league_code = req.params.domestic_league_code;
    await competitionDict.model.find({domestic_league_code: domestic_league_code}, 'competition_id domestic_league_code competition_name')
        .then(competitions => {
            if (competitions.length <= 0) {
                res.json("not found");
            } else {

                res.json(competitions);
            }
        })
        .catch((err) => {
            res.status(500).send('Invalid data or not found' + JSON.stringify(err));
        });
});
router.get('/insert_mongo', (req, res) => {
    try {
        const competitionPromise = loadDataset(competitionDict)
        const flagsPromise = loadDataset()
        const gameLineupsPromise = loadDataset(gameLineupsDict)
        const playerValuationPromise = loadDataset(playerValuationDict)
        const appearancePromise = loadDataset(appearanceDict)
        Promise.all([competitionPromise, gameLineupsPromise, playerValuationPromise, appearancePromise])
            .then(r => {
                res.status(200).send('completed insertion_mongo.')
            })
    } catch (err) {
        res.status(500).send('error' + err)
    }
})

router.get('/insert_flags', (req, res) => {
    loadDataset(flagDict)
        .then(r => {
            res.status(200).send('loaded dataset.')
        })
        .catch(err => res.status(500).send('error occurred inserting appearances'))
})

router.get('/insert_appearances', (req, res) => {
    loadDataset(appearanceDict)
        .then(r => {
            res.status(200).send('loaded dataset.')
        })
        .catch(err => res.status(500).send('error occurred inserting appearances, '+ err))
})

router.get('/insert_competitions', (req, res) => {
    loadDataset(competitionDict)
        .then(r => {
            res.status(200).send('loaded dataset.')
        })
        .catch(err => res.status(500).send('error occurred inserting competitions'))
})

router.get('/insert_game_lineups', (req, res) => {
    loadDataset(gameLineupsDict)
        .then(r => {
            res.status(200).send('loaded dataset.')
        })
        .catch(err => res.status(500).send('error occurred inserting game lineups'))
})

router.get('/insert_player_valuations', (req, res) => {
    loadDataset(playerValuationDict)
        .then(r => {
            res.status(200).send('loaded dataset.')
        })
        .catch(err => res.status(500).send('error occurred inserting player valuations'))
})


const batchSize = 50000; // You can adjust this based on your dataset size

/** It imports passed data to MongoDB
 * @param modelDict a dict containing model name, the scheme model where to insert data, the dataset and if the dataset
 * is empty
 * */
const loadDataset = async (modelDict) => {
    if (modelDict.controller.isEmpty()) {
        try {
            modelDict.dataset = JSON.parse(fs.readFileSync(modelDict.dataset, 'utf-8'))
            modelDict.controller.pushDataset(modelDict.dataset)
                .then(() => {
                    console.log(modelDict.name, "imported correctly!");
                    modelDict.dataset = null
                })
                .catch(err => {
                    console.log("error pushing dataset in", modelDict.name, '\n'+ err)
                })
        } catch (err) {
            console.log("failed to load", modelDict.name + ": json not found\n"+ err)
        }
    } else {
        console.log(modelDict.name, "wasn't empty!");
    }
};

module.exports = router;
