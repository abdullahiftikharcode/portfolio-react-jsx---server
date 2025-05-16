const Skill = require('../models/Skill');

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single skill
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create skill
exports.createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const savedSkill = await skill.save();
    
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update skill
exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.status(200).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 