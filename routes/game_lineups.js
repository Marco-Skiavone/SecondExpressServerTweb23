const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let gameLineups = require("../controllers/game_lineups")
const gameLineupsController = new gameLineups(generalPath)

router.get('/get_game_lineups_by_game_and_club/:game_id/:club_id', async (req, res) => {
    gameLineupsController.getGameLineupsByGameAndClub(req.params.game_id, req.params.club_id)
        .then(list => {
            if (list && list.length) {
                res.status(200).json(list)
            } else {
                res.status(404).send('Something gone wrong, \'list\' seems empty in game_lineups.')
            }
        })
        .catch(err => {
            console.error('Error fetching game_lineups', err);
            res.status(500).send('Internal server error')
        })
})

module.exports = router;
