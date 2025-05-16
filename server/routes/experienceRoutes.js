const express = require('express');
const router = express.Router();
const { 
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');

router.route('/')
  .get(getAllExperiences)
  .post(createExperience);

router.route('/:id')
  .get(getExperienceById)
  .put(updateExperience)
  .delete(deleteExperience);

module.exports = router;