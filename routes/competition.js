const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let competition = require("../controllers/competition")
const competitionController = new competition(generalPath)

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

router.get('/get_competition_by_id/:id', async (req, res) => {
    /* #swagger.tags = ['Competition']
   #swagger.description = 'GET route to retrieve data of a specific competition.'
   #swagger.parameters['id'] = {
       in: 'path',
       description: 'The \`id\` of the competition to retrieve.',
       type: 'string',
       required: 'true'
   }
   #swagger.responses[404] = {
       description: 'Request content was not found.'
   }
   #swagger.responses[500] = {
       description: 'Error! Called a GET without the required params. REQUIRED PARAMETER: \'id\'. GET: \'/get_competition_by_id\''
   }
   */
    await competitionController.getCompetitionById(req.params.id)
        .then(competition => {
            if (competition.length)
                res.status(200).json(competition[0])
            else
                res.status(404).send('Competition by id not found!')
        })
        .catch(err => {
            res.status(500).json(String('Error get_competition_by_id: ' + err))
        })
})

router.get('/get_national_competitions/:domestic_league_code', async (req, res) => {
    /* #swagger.tags = ['Competition']
   #swagger.description = 'GET route to retrieve the competitions of a certain nation.'
   #swagger.parameters['domestic_league_code'] = {
       in: 'path',
       description: 'The \`id\` of the nation to retrieve.',
       type: 'string',
       required: 'true'
   }
   #swagger.responses[404] = {
       description: 'Request content was not found.'
   }
   #swagger.responses[500] = {
       description: 'Error! Called a GET without the required params. REQUIRED PARAMETER: \'domestic_league_code\'. GET: \'/get_national_competitions\''
   }
   */
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

module.exports = router;
