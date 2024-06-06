const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let gameLineups = require("../controllers/game_lineups")
const gameLineupsController = new gameLineups(generalPath)

router.get('/get_starting_lineups/:game_id', async (req, res) => {
    await gameLineupsController.getStartingLineups(req.params.game_id)
        .then(starting_lineups => {
            if (starting_lineups)
                res.status(200).json(starting_lineups)
            else    // if no starting lineup is found, then will return a body with ".error" attribute
                res.status(404).json(JSON.stringify({error: 'Starting Lineups not found!'}))
        })
        .catch(err => {
            res.status(500).json(String('Error: find_competitions_by_code: ' + err))
        })
})

module.exports = router;
