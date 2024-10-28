const express = require('express');
const router = express.Router();
const binsController = require('../controllers/binsController');

router.get('/', binsController.getAllBins);
router.post('/', binsController.addBin);
router.put('/:id', binsController.updateBin);
router.delete('/:id', binsController.deleteBin);
router.get('/:id/weekly', binsController.getWeeklyData);
router.get('/:id/monthly', binsController.getMonthlyData);
router.post('/:id/history', binsController.addHistoryData);

module.exports = router;