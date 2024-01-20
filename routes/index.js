const express = require('express');
const router = express.Router();
const fs = require('fs');

const datasetPath = './json/';

let appearanceDict = {
    'name'    : 'appearance',
    'model'   : require("../models/appearance"),
    'dataset' : JSON.parse(fs.readFileSync(datasetPath + 'cleaned_appearances.json', 'utf-8')),
    'isEmpty'  : true
}

let competitionDict = {
    'name'    : 'competition',
    'model'   : require("../models/competition"),
    'dataset' : JSON.parse(fs.readFileSync(datasetPath + 'cleaned_competitions.json', 'utf-8')),
    'isEmpty'  : true
}

let gameLineupsDict = {
    'name'    : 'game lineups',
    'model' : require("../models/game_lineups"),
    'dataset' : JSON.parse(fs.readFileSync(datasetPath + 'cleaned_game_lineups.json', 'utf-8')),
    'isEmpty': true
}

let playerValuationModelDict = {
    'name'    : 'player valuation',
    'model' : require("../models/player_valuations"),
    'dataset' : JSON.parse(fs.readFileSync(datasetPath + 'cleaned_player_valuations.json', 'utf-8')),
    'isEmpty': true
}


router.get('/insert_mongo', (req, res) =>{
    try {
        const competitionPromise = loadDataset(competitionDict)
        const gameLineupsPromise = loadDataset(gameLineupsDict);
        const playerValuationPromise = loadDataset(playerValuationModelDict)
        const appearancePromise = loadDataset(appearanceDict)
        Promise.all([competitionPromise, gameLineupsPromise,  playerValuationPromise, appearancePromise])
            .then(r => {
                res.status(200).send('Loaded all dataset.')
            })
    } catch (err) {
        res.status(500).send('error' + err)
    }
})

router.get('/insert_appearance', (req, res) =>{
    loadDataset(appearanceDict)
        .then(r => {
            res.status(200).send('Loaded dataset.')
        })
        .catch(err => res.status(500).send('error' + err))
})

router.get('/insert_competitions', (req, res) =>{
    loadDataset(competitionDict)
        .then(r => {
            res.status(200).send('Loaded dataset.')
        })
        .catch(err => res.status(500).send('error' + err))
})

router.get('/insert_game_lineups', (req, res) =>{
    loadDataset(gameLineupsDict)
        .then(r => {
            res.status(200).send('Loaded dataset.')
        })
        .catch(err => res.status(500).send('error' + err))
})

router.get('/insert_player_valuations', (req, res) =>{
    loadDataset(playerValuationModelDict)
        .then(r => {
            res.status(200).send('Loaded dataset.')
        })
        .catch(err => res.status(500).send('error' + err))
})

/** It imports passed data to MongoDB
 * @param modelDict a dict containing model name, the scheme model where to insert data, the dataset and if the dataset
 * is empty
 * */
const loadDataset = async (modelDict) => {
    if (modelDict.isEmpty) {
        await modelDict.model.insertMany(modelDict.dataset)
        modelDict.isEmpty = false;
        console.log(modelDict.name + " imported correctly!");
        modelDict.dataset = null;

    } else
        console.log(modelDict.name + " wasn't empty!");
}


module.exports = router;
