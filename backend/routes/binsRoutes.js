const express = require('express');
const router = express.Router();
const binsController = require('../controllers/binsController');

router.get('/datos-sheet', binsController.binCreate)

module.exports = router;