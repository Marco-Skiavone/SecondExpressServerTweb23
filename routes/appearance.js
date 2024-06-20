const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let appearance = require("../controllers/appearance")
const appearanceController = new appearance(generalPath)

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

router.get('/get_every_player_appearances/:player_id', async (req, res) => {
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

router.get('/get_game_appearances/:game_id', async (req, res) => {
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

module.exports = router;