var express = require('express');
var router = express.Router();

const competitionModel = require("../models/competition");
const gameLineupsModel = require("../models/game_lineups");
const playerValuationModel = require("../models/player_valuations");

const csvParser = require('csv-parser');
const fs = require('fs');
/* GET home page. */

//Precondition str is not null
function stringToBool(str) {
    if (str === null) {
        return new Error("Not valid string");
    }
    if (str === "False") {
        return false;
    } else if (str === "True") {
        return true;
    }
}

router.get('/insertGameLineups', (req, res) => {
    const gameLineups = [];

    fs.createReadStream("./csv/game_lineups.csv")
        .pipe(csvParser())
        .on('data', (row) => {
            const newGameLineups ={
                game_lineups_id: row.game_lineups_id,
                game_id: row.game_id,
                club_id: row.club_id,
                type: row.type,
                number: row.number,
                player_id: row.player_id,
                player_name: row.player_name,
                team_captain: stringToBool(row.team_captain),
                position: row.position
            };
            gameLineups.push(newGameLineups);
        })
        .on('end', () => {
            gameLineupsModel.insertMany(gameLineups)
                .then((result) => {
                    console.log(result.length + ' game lineups inserted');
                    res.send('Game lineups successfully loaded on MongoDB!');
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send('Error inserting game lineups');
                });
        });
});

router.get('/insertPlayerValuations', (req, res) => {
    const playerValuations = [];

    fs.createReadStream("./csv/player_valuations.csv")
        .pipe(csvParser())
        .on('data', (row) => {
            const newPlayerValuation = {
                player_id: row.player_id,
                last_season: row.last_season,
                date: row.date,
                date_week: row.date_week,
                market_value_eur: row.market_value_eur,
                current_club_id: row.current_club_id,
                current_dom_competition_code: row.current_dom_competition_code
            };
            playerValuations.push(newPlayerValuation);
        })
        .on('end', () => {
            playerValuationModel.insertMany(playerValuations)
                .then((result) => {
                    console.log(result.length + ' player valuations inserted');
                    res.send('Player valuations successfully loaded on MongoDB!');
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send('Error inserting player valuations');
                });
        });
});

    router.get('/insertCompetition', (req, res) => {
        const competitions = [];

        fs.createReadStream("./csv/competitions.csv")
            .pipe(csvParser())
            .on('data', (row) => {
                const newCompetition ={
                    competition_id: row.competition_id,
                    competition_name: row.competition_name,
                    sub_type: row.sub_type,
                    competition_type: row.competition_type,
                    country_name: row.country_name,
                    domestic_league_code: row.domestic_league_code,
                    competition_url: row.competition_url
                };
                competitions.push(newCompetition);
            })
            .on('end', () => {
                competitionModel.insertMany(competitions)
                    .then((results) => {
                        console.log(results.length + ' competitions inserted');
                        res.send('Competitions successfully loaded on MongoDB!');
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send('Error inserting competitions');
                    });
            });
    });

    module.exports = router;
