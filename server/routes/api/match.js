const express = require("express");
const router = express.Router();

const MatchManager = require("../../manager/MatchManager");

router.post("/", (req, res) => {
  const hostId = req.body;
  try {
    const matchId = MatchManager.createMatch(hostId);
    res.json(matchId);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/:id/join-match", (req, res) => {
  const matchId = req.params.id;
  try {
    const message = MatchManager.joinMatch(matchId);
    res.status(message.status).json(message);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server error");
  }
});

router.get('/:id/teams', (req, res) => {
  const matchId = req.params.id;
  try {
    const match = MatchManager.getMatch(matchId);
    if (!match) {
      res.status(400).json({
        message: 'No Match found'
      })
    }
    res.json({
      redTeam: match.getRedTeam(),
      blueTeam: match.getBlueTeam()
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

module.exports = router;
