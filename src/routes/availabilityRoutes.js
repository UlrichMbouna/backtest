const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

// CRUD Availability
router.post('/', availabilityController.createAvailability);           // Create
router.get('/', availabilityController.getAllAvailabilities);         // Read all
router.get('/:id', availabilityController.getAvailabilitiesByOwner);       // Read one
router.put('/:id', availabilityController.updateAvailability);        // Update
router.delete('/:id', availabilityController.deleteAvailability);     // Delete

module.exports = router;
