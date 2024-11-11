const express = require('express');
const router = express.Router();
const binsController = require('../controllers/binsController');

router.get('/', binsController.getBins); // Define the route to get all bins
router.get('/datos-sheet', binsController.binCreate); // Define the route to fetch and save data from Google Sheets

module.exports = router;