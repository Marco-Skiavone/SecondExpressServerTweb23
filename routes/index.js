const express = require('express');
const router = express.Router();
const fs = require('fs');

const datasetPath = './json/';

let appearanceDict = {
    'name'    : 'appearance',
    'model'   : require("../models/appearance"),
    'dataset' : datasetPath + 'cleaned_appearances.json'
}

let competitionDict = {
    'name'    : 'competition',
    'model'   : require("../models/competition"),
    'dataset' : datasetPath + 'cleaned_competitions.json'
}

let gameLineupsDict = {
    'name'    : 'game lineups',
    'model' : require("../models/game_lineups"),
    'dataset' : datasetPath + 'cleaned_game_lineups.json'
}

let playerValuationDict = {
    'name'    : 'player valuation',
    'model' : require("../models/player_valuations"),
    'dataset' : datasetPath + 'cleaned_player_valuations.json'
}

router.get('/insert_mongo', (req, res) =>{
    try {
        const competitionPromise = loadDataset(competitionDict)
        const gameLineupsPromise = loadDataset(gameLineupsDict)
        const playerValuationPromise = loadDataset(playerValuationDict)
        const appearancePromise = loadDataset(appearanceDict)
        Promise.all([competitionPromise, gameLineupsPromise,  playerValuationPromise, appearancePromise])
            .then(r => {
                res.status(200).send('completed insertion_mongo.')
            })
    } catch (err) {
        res.status(500).send('error' + err)
    }
})

router.get('/insert_appearances', (req, res) =>{
    loadDataset(appearanceDict)
        .then(r => {
            res.status(200).send('loaded dataset.')
        })
        .catch(err => res.status(500).send('error occurred inserting appearances'))
})

router.get('/insert_competitions', (req, res) =>{
    loadDataset(competitionDict)
        .then(r => {
            res.status(200).send('loaded dataset.')
        })
        .catch(err => res.status(500).send('error occurred inserting competitions'))
})

router.get('/insert_game_lineups', (req, res) =>{
    loadDataset(gameLineupsDict)
        .then(r => {
            res.status(200).send('loaded dataset.')
        })
        .catch(err => res.status(500).send('error occurred inserting game lineups'))
})

router.get('/insert_player_valuations', (req, res) =>{
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
    if (!await modelDict.model.findOne()) {
        try {
            modelDict.dataset = JSON.parse(fs.readFileSync(modelDict.dataset, 'utf-8'))
            for (let i = 0; i < modelDict.dataset.length; i += batchSize) {
                const batch = modelDict.dataset.slice(i, i + batchSize);
                await modelDict.model.insertMany(batch);
            }
            modelDict.dataset = null
            console.log(modelDict.name + " imported correctly!");
        } catch (err) {
            console.log("failed to load " + modelDict.name + ": json not found")
        }
    } else {
        console.log(modelDict.name + " wasn't empty!");
    }
};

module.exports = router;
