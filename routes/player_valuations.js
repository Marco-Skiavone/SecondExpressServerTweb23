const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let playerValuation = require("../controllers/player_valuations")
const playerValuationController = new playerValuation(generalPath)

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

router.get('/get_valuations_of_player/:player_id', async (req, res) => {
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

router.get('/get_last_players_by_valuations', async (req, res) => {
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

module.exports = router;