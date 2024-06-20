const express = require('express');
const router = express.Router();
const fs = require('fs');
const {load} = require("debug");

const generalPath = './json/';

let gameLineups = require("../controllers/game_lineups")
const gameLineupsController = new gameLineups(generalPath)

module.exports = router;
