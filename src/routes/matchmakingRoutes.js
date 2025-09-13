const express = require('express');
const router = express.Router();
const matchmakingController = require('../controllers/matchmakingController');

router.get('/student/:id', matchmakingController.getMatchesForStudent);

module.exports = router;
