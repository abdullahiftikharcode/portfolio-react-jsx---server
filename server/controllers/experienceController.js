const Experience = require('../models/Experience');

// Get all experiences
exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single experience
exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create experience
exports.createExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    const savedExperience = await experience.save();
    
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update experience
exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.status(200).json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete experience
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 