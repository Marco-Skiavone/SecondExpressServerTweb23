const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let flag = require("../controllers/flags")
const flagsController = new flag(generalPath)

router.get('/get_all', async (req, res) => {
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

router.get('/get_nation_by_code/:code', (req, res) => {
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

module.exports = router;