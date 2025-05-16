const Education = require('../models/Education');

// Get all education entries
exports.getAllEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ startDate: -1 });
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single education entry
exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }
    
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create education entry
exports.createEducation = async (req, res) => {
  try {
    const education = new Education(req.body);
    const savedEducation = await education.save();
    
    res.status(201).json(savedEducation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update education entry
exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }
    
    res.status(200).json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete education entry
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }
    
    res.status(200).json({ message: 'Education entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 