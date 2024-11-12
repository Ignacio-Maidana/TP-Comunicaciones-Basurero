const express = require('express');
const router = express.Router();
const binController = require('../controllers/binsController');

router.post('/data-sync', binController.binCreate);
router.get('/data', binController.binFindData);

module.exports = router;