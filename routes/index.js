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
const {listen} = require("express/lib/application");

const appearanceController = new appearance(generalPath)
const competitionController = new competition(generalPath)
const gameLineupsController = new gameLineups(generalPath)
const playerValuationController = new playerValuation(generalPath)
const flagsController = new flag(generalPath)

router.get('/competitions/get_national_competitions/:domestic_league_code', async (req, res) => {
    await competitionController.findByCode(req.params.domestic_league_code)
        .then(competitions => {
            if (competitions.length > 0)
                res.status(200).json(competitions)
            else
                res.status(404).json('Competition by code not found!')
        })
        .catch(err => {
            res.status(500).json(String('Error: find_competitions_by_code: ' + err))
        })
})

router.post('/competitions/get_competitions_by_ids', async (req, res) => {
    await competitionController.getCompetitionsByIds(req.body.list)
        .then((data) => {
            if (data.length > 0)
                res.status(200).send(data)
            else
                res.status(204).send('Competitions by competition_id not found!')
        })
        .catch(err => {
            res.status(500).send('Error: competitions/get_competition_id_name_id: ' + err)
            console.log(err)
        })
})

router.get('/flags/get_all', async (req, res) => {
    flagsController.getAll()
        .then(flags => {
            if (flags.length > 0) {
                res.status(200).json(flags)
            } else {
                res.status(404).send('Something gone wrong, \'flags\' seems empty.')
            }
        })
        .catch(error => {
            console.error('Error fetching flags database', error);
            res.status(500).send('Internal server error')
        })
})

router.get('/flags/get_nation_by_code/:code', (req, res) => {
    if (req.params.code)
        flagsController.getByCode(req.params.code)
            .then(nation => res.status(200).json(nation))
            .catch(err => {
                console.error('Error fetching flags', err);
                res.status(500).send('Internal server error')
            })
    else
        res.status(500).json('Invalid code in \'/flags/get_nation_by_code/\' GET!')
})

router.get('/player_valuations/get_last_valuation_of_player/:player_id', async (req, res) => {
    playerValuationController.getLastValuationOfPlayer(req.params.player_id)
        .then(list => {
            if (list && list.length > 0) {
                res.status(200).json(list)
            } else {
                res.status(404).send('Something gone wrong, \'list\' seems empty in player_valuations.')
            }
        })
        .catch(err => {
            console.error('Error fetching player_valuations', err);
            res.status(500).send('Internal server error')
        })
})

router.get('/player_valuations/get_valuations_of_player/:player_id', async (req, res) => {
    playerValuationController.getValuationsOfPlayer(req.params.player_id)
        .then(list => {
            if (list) {
                res.status(200).json(list)
            } else {
                res.status(404).send('Something gone wrong, \'list\' seems empty in player_valuations.')
            }
        })
        .catch(err => {
            console.error('Error fetching player_valuations', err);
            res.status(500).send('Internal server error')
        })
})

router.get('/player_valuations/get_last_players_by_valuations', async (req, res) => {
    playerValuationController.getLastByValuation()
        .then(list => {
            if (list && list.length > 0) {
                res.status(200).json(list)
            } else {
                res.status(404).send('Something gone wrong, \'list\' seems empty in player_valuations.')
            }
        })
        .catch(err => {
            console.error('Error fetching player_valuations', err);
            res.status(500).send('Internal server error')
        })
})

router.get('/appearances/get_every_player_appearances/:player_id', async (req, res) => {
    appearanceController.getLastPlayerAppearances(req.params.player_id)
        .then(list => {
            if (list && list.length > 0) {
                res.status(200).json(list)
            } else {
                res.status(404).send('Something gone wrong, \'list\' seems empty in appearances.')
            }
        })
        .catch(err => {
            console.error('Error fetching appearances', err);
            res.status(500).send('Internal server error')
        })
})

router.get('/appearances/get_game_appearances/:game_id', async (req, res) => {
    appearanceController.getGameAppearances(req.params.game_id)
        .then(list => {
            if (list && list.length > 0) {
                res.status(200).json(list)
            } else {
                res.status(404).send('Something gone wrong, \'list\' seems empty in appearances.')
            }
        })
        .catch(err => {
            console.error('Error fetching appearances', err);
            res.status(500).send('Internal server error')
        })
})

router.get('/game_lineups/get_game_lineups_by_game_and_club/:game_id/:club_id', async (req, res) => {
    gameLineupsController.getGameLineupsByGameAndClub(req.params.game_id, req.params.club_id)
        .then(list => {
            if (list && list.length > 0){
                res.status(200).json(list)
            }else {
                res.status(404).send('Something gone wrong, \'list\' seems empty in game_lineups.')
            }
        })
        .catch(err => {
            console.error('Error fetching game_lineups', err);
            res.status(500).send('Internal server error')
        })
})


router.get('/insert_mongo', async (req, res) => {
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
        .catch(err => res.status(500).send('Error occurred inserting appearances: ' + err))
})

router.get('/insert_competitions', (req, res) => {
    competitionController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + competitionController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting competitions: ' + err))
})

router.get('/insert_game_lineups', (req, res) => {
    gameLineupsController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + gameLineupsController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting game lineups: ' + err))
})

router.get('/insert_player_valuations', (req, res) => {
    playerValuationController.loadDataset()
        .then(response => {
            res.status(200).send('Loaded dataset' + playerValuationController.name)
        })
        .catch(err => res.status(500).send('Error occurred inserting player valuations: ' + err))
})

module.exports = router;
