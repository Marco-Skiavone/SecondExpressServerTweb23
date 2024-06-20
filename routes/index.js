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

console.log('secondExpressServer started!')

router.get('/flags/get_all', async (req, res) => {
    /* #swagger.tags = ['Flags']
    #swagger.description = 'GET route to retrieve flags data of every nation.'
    #swagger.responses[404] = {
        description: 'Request content was not found.'
    }
    #swagger.responses[500] = {
        description: 'Error! Internal server error'
    }
    */
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
    /* #swagger.tags = ['Flags']
    #swagger.description = 'GET route to retrieve flag data about a specific nation.'
    #swagger.parameters['code'] = {
        in: 'path',
        description: 'The \`nation_code\` of the nation data to retrieve.',
        type: 'string',
        required: 'true'
    }
    #swagger.responses[404] = {
        description: 'Request content was not found.'
    }
    #swagger.responses[500] = {
        description: 'Error! Called a GET without the required params. REQUIRED PARAMETER: \'code\'. GET: \'/get_nation_by_code\''
    }
    */
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
    /* #swagger.tags = ['Player Valuations']
    #swagger.description = 'GET route to retrieve the last valuations of a specific player.'
    #swagger.parameters['player_id'] = {
        in: 'path',
        description: 'The \`id\` of the player to retrieve.',
        type: 'number',
        required: 'true'
    }
    #swagger.responses[404] = {
        description: 'Request content was not found.'
    }
    #swagger.responses[500] = {
        description: 'Error! Called a GET without the required params. REQUIRED PARAMETER: \'player_id\'. GET: \'/get_lat_valuation_of_player\''
    }
    */
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
    /* #swagger.tags = ['Player Valuations']
    #swagger.description = 'GET route to retrieve the valuations of a specific player.'
    #swagger.parameters['player_id'] = {
        in: 'path',
        description: 'The \`id\` of the player to retrieve.',
        type: 'number',
        required: 'true'
    }
    #swagger.responses[404] = {
        description: 'Request content was not found.'
    }
    #swagger.responses[500] = {
        description: 'Error! Called a GET without the required params. REQUIRED PARAMETER: \'player_id\'. GET: \'/get_valuations_of_player\''
    }
    */
    playerValuationController.getValuationsOfPlayer(req.params.player_id)
        .then(list => {
            if (list && list.length) {
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
    /* #swagger.tags = ['Player Valuations']
    #swagger.description = 'GET route to retrieve 24 players with the more recent and higher valuations.'
    #swagger.responses[404] = {
        description: 'Request content was not found.'
    }
    #swagger.responses[500] = {
        description: 'Error! internal server error'
    }
    */
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
    /* #swagger.tags = ['Appearances']
    #swagger.description = 'GET route to retrieve all the appearances of a specific player.'
    #swagger.parameters['player_id'] = {
        in: 'path',
        description: 'The \`id\` of the player to retrieve.',
        type: 'number',
        required: 'true'
    }
    #swagger.responses[404] = {
        description: 'Request content was not found.'
    }
    #swagger.responses[500] = {
        description: 'Error! Called a GET without the required params. REQUIRED PARAMETER: \'player_id\'. GET: \'/get_every_player_appearances\''
    }
    */
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
    /* #swagger.tags = ['Appearances']
    #swagger.description = 'GET route to retrieve the appearances of a specific game.'
    #swagger.parameters['game_id'] = {
        in: 'path',
        description: 'The \`id\` of the game to retrieve.',
        type: 'number',
        required: 'true'
    }
    #swagger.responses[404] = {
        description: 'Request content was not found.'
    }
    #swagger.responses[500] = {
        description: 'Error! Called a GET without the required params. REQUIRED PARAMETER: \'game_id\'. GET: \'/get_game_appearances\''
    }
    */
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
