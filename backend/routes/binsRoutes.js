// backend/routes/binsRoutes.js
const express = require('express'); // Import express
const router = express.Router(); // Create a router instance
const binsController = require('../controllers/binsController'); // Import the bins controller

// Define routes for bin operations
router.get('/', binsController.getAllBins); // GET all bins
router.post('/', binsController.addBin); // POST a new bin
router.put('/:id', binsController.updateBin); // PUT update a bin by ID
router.delete('/:id', binsController.deleteBin); // DELETE a bin by ID

// Export the router to be used in other parts of the application
module.exports = router;
