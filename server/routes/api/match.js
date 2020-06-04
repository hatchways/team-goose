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

module.exports = router;
