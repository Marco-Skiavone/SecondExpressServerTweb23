const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';
let competition = require("../controllers/competition")
//const {listen} = require("express/lib/application");

const competitionController = new competition(generalPath)

router.get('/competitions/get_competition_by_id/:id', async (req, res) => {
    await competitionController.getCompetitionById(req.params.id)
        .then(competition => {
            if (competition.length > 0)
                res.status(200).json(competition[0])
            else
                res.status(404).send('Competition by id not found!')
        })
        .catch(err => {
            res.status(500).json(String('Error get_competition_by_id: ' + err))
        })
})

module.exports = router;