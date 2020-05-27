const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const GameEngin = require('../engine/Game');

router.post("/match",
	[
		check('hostID', "No host id provided").not().isEmpty(),
		check('isPublic', "isPublic required").not().isEmpty(),
		check('isPublic', "Invalid isPublic").isIn(["true", "false"])
	],
	function (req, res, next) {
		console.log("hello");
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { hostID, isPublic } = req.body;

		try {
			let gameID = MatchManager.createMatch(hostID, isPublic);
			res.json(gameID);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	});