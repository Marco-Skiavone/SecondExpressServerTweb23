const express = require('express');
const router = express.Router();
const fs = require('fs');

const dataset_path = '../json/';

let competitionDict = {
    'name'    : 'competition',
    'model'   : require("../models/competition"),
    'dataset' : JSON.parse(fs.readFileSync(dataset_path + 'cleaned_competitions.json', 'utf-8')),
    'isEmpty'  : true
}

let gameLineupsDict = {
    'name'    : 'game lineups',
    'model' : require("../models/game_lineups"),
    'dataset' : JSON.parse(fs.readFileSync(dataset_path + 'cleaned_game_lineups.json', 'utf-8')),
    'isEmpty': true
}

let playerValuationModelDict = {
    'name'    : 'player valuation',
    'model' : require("../models/player_valuations"),
    'dataset' : JSON.parse(fs.readFileSync(dataset_path + 'cleaned_player_valuations.json', 'utf-8')),
    'isEmpty': true
}


router.get('/insert_mongo', (req, res) =>{
    // @todo: add 3 routes to call
    try {
        const competitionPromise = load_dataset(competitionDict)
        const gameLineupsPromise = load_dataset(gameLineupsDict);
        const playerValuationPromise = load_dataset(playerValuationModelDict)
        Promise.all([competitionPromise, gameLineupsPromise,  playerValuationPromise])
            .then(r => {
                res.status(200).send('Loaded all dataset.')
            })
    } catch (err) {
        res.status(500).send('error' + err)
    }
})

router.get('/insert_competitions', (req, res) =>{
    load_dataset(competitionDict)
        .then(r => {
            res.status(200).send('Loaded dataset.')
        })
        .catch(err => res.status(500).send('error' + err))
})

router.get('/insert_game_lineups', (req, res) =>{
    load_dataset(gameLineupsDict)
        .then(r => {
            res.status(200).send('Loaded dataset.')
        })
        .catch(err => res.status(500).send('error' + err))
})

router.get('/insert_player_valuations', (req, res) =>{
    load_dataset(playerValuationModelDict)
        .then(r => {
            res.status(200).send('Loaded dataset.')
        })
        .catch(err => res.status(500).send('error' + err))
})

/** It imports passed data to MongoDB
 * @param modelDict a dict containing model name, the scheme model where to insert data, the dataset and if the dataset
 * is empty
 * */
const load_dataset = async (modelDict) => {
    if (modelDict.isEmpty) {
        await modelDict.model.insertMany(modelDict.dataset)
        modelDict.isEmpty = false;
        console.log(modelDict.name + " imported correctly!");
        modelDict.dataset = null;

    } else
        console.log(modelDict.name + " wasn't empty!");
}


module.exports = router;
