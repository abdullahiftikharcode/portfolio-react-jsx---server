const express = require('express');
const router = express.Router();
const { 
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
} = require('../controllers/educationController');

router.route('/')
  .get(getAllEducation)
  .post(createEducation);

router.route('/:id')
  .get(getEducationById)
  .put(updateEducation)
  .delete(deleteEducation);

module.exports = router; 