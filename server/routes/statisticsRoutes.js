const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statisticController');

// GET all statistics
router.get('/', statisticController.getAllStatistics);

// GET a single statistic by name
router.get('/:name', statisticController.getStatisticByName);

// POST create a new statistic
router.post('/', statisticController.createStatistic);

// PUT update a statistic
router.put('/:name', statisticController.updateStatistic);

// DELETE a statistic
router.delete('/:name', statisticController.deleteStatistic);

module.exports = router; 