const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';
let competition = require("../controllers/competition")

const competitionController = new competition(generalPath)

router.get('/get_competition_by_id/:id', async (req, res) => {
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

router.post('/get_competitions_by_ids', async (req, res) => {
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

module.exports = router;
