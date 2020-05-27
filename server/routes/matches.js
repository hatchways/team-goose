const express = require('express');
const router = express.Router();

const MatchManager = require('../game_manager/MatchManager');

router.post("/match", (req, res) => {
    const hostId = req.body;
    try {
        const matchId = MatchManager.createMatch(hostId);
        res.json(matchId);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post("/:matchId/join-match", (req, res) => 
{
    const matchId = req.params.matchId;
    console.log(req.params, "req params")
    try {
        const message = MatchManager.joinMatch(matchId);
        res.json(message);
    } catch (err) {
        console.err(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;
