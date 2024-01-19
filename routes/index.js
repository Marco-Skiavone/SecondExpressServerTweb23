const express = require('express');
const router = express.Router();
const fs = require('fs');

const competitionModel = require("../models/competition");
const gameLineupsModel = require("../models/game_lineups");
const playerValuationModel = require("../models/player_valuations");
const dataset_path = './json/';

let competitions_dataset = JSON.parse(fs.readFileSync(dataset_path + 'cleaned_competitions.json', 'utf-8'))
let game_lineups_dataset = JSON.parse(fs.readFileSync(dataset_path + 'cleaned_game_lineups.json', 'utf-8'))
let player_valuations_dataset = JSON.parse(fs.readFileSync(dataset_path + 'cleaned_player_valuations.json', 'utf-8'))

let dataset_loaded = {
    'competitions': false,
    'game_lineups': false,
    'player_valuations': false
}

router.get('/insert_mongo', (req, res) =>{
    // @todo: add 3 routes to call
    // res.redirect('insert_competitions')
    // res.redirect('insert_game_lineups')
    // res.redirect('insert_player_valuations')
    // res.end()
})

router.get('/insert_competitions', (req, res) =>{
    if(!dataset_loaded.competitions){
        import_dataset(competitionModel, competitions_dataset)
            .then(r => {
                dataset_loaded.competitions = true;
                console.log('competitions imported correctly!');
                competitions_dataset = null;
                res.send('Loaded dataset.')
            })
            .catch(err => res.status(500).send('error' + err))
    } else
        res.status(208).send('Already loaded.')
})

router.get('/insert_game_lineups', (req, res) =>{
    if(!dataset_loaded.game_lineups){
        import_dataset(gameLineupsModel, game_lineups_dataset)
            .then(r => {
                dataset_loaded.game_lineups = true;
                console.log('game_lineups imported correctly!');
                game_lineups_dataset = null;
                res.send('Loaded dataset.')
            })
            .catch(err => res.status(500).send('error' + err))
    } else
        res.status(208).send('Already loaded.')
})

router.get('/insert_player_valuations', (req, res) =>{
    if(!dataset_loaded.player_valuations){
        import_dataset(playerValuationModel, player_valuations_dataset)
            .then(r => {
                dataset_loaded.player_valuations = true;
                console.log('player_valuations imported correctly!');
                player_valuations_dataset = null;
                res.send('Loaded dataset.')
            })
            .catch(err => res.status(500).send('error' + err))
    } else
        res.status(208).send('Already loaded.')
})

/** It imports passed data to MongoDB
 * @param model the scheme model where to push the dataset
 * @param data the json data to import in mongodb
 * */
const import_dataset = async (model, data) => {
    try{
        await model.insertMany(data)
    } catch(error) {
        console.log('error', error)
    }
}

module.exports = router;
