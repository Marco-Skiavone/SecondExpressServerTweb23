var express = require('express');
var router = express.Router();
const competition = require("../controllers/Competition");

/* GET home page. */
router.post('/insert', async (req, res) => {
    try {
        const results = await competition.insert(req.body);
        res.json(results);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.post('/query', async (req, res) => {
    try {
        const results = await competition.query(req.body);
        res.json(results);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

module.exports = router;
