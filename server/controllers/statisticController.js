const Statistic = require('../models/Statistic');

// Get all statistics
exports.getAllStatistics = async (req, res) => {
  try {
    const statistics = await Statistic.find();
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};

// Get a single statistic by name
exports.getStatisticByName = async (req, res) => {
  try {
    const statistic = await Statistic.findOne({ name: req.params.name });
    
    if (!statistic) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    
    res.status(200).json(statistic);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistic', error: error.message });
  }
};

// Create a new statistic
exports.createStatistic = async (req, res) => {
  try {
    const { name, value, icon } = req.body;
    
    // Check if statistic already exists
    const existingStatistic = await Statistic.findOne({ name });
    if (existingStatistic) {
      return res.status(400).json({ message: 'Statistic already exists' });
    }
    
    const statistic = new Statistic({
      name,
      value,
      icon: icon || null
    });
    
    const savedStatistic = await statistic.save();
    res.status(201).json(savedStatistic);
  } catch (error) {
    res.status(500).json({ message: 'Error creating statistic', error: error.message });
  }
};

// Update a statistic
exports.updateStatistic = async (req, res) => {
  try {
    const { name } = req.params;
    const { value, icon } = req.body;
    
    const statistic = await Statistic.findOne({ name });
    
    if (!statistic) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    
    statistic.value = value !== undefined ? value : statistic.value;
    statistic.icon = icon !== undefined ? icon : statistic.icon;
    
    const updatedStatistic = await statistic.save();
    res.status(200).json(updatedStatistic);
  } catch (error) {
    res.status(500).json({ message: 'Error updating statistic', error: error.message });
  }
};

// Delete a statistic
exports.deleteStatistic = async (req, res) => {
  try {
    const { name } = req.params;
    
    const result = await Statistic.deleteOne({ name });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Statistic not found' });
    }
    
    res.status(200).json({ message: 'Statistic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting statistic', error: error.message });
  }
};

// Initialize default statistics if they don't exist
exports.initializeStatistics = async () => {
  try {
    const defaultStats = [
      { name: 'total_hours', value: 1500 },
      { name: 'projects_done', value: 50 },
      { name: 'satisfied', value: 40 },
      { name: 'certifications', value: 10 }
    ];
    
    for (const stat of defaultStats) {
      const existingStat = await Statistic.findOne({ name: stat.name });
      if (!existingStat) {
        await new Statistic(stat).save();
        console.log(`Initialized default statistic: ${stat.name}`);
      }
    }
    
    console.log('Statistics initialization complete');
  } catch (error) {
    console.error('Error initializing statistics:', error);
  }
}; 