const templeService = require('../services/templeService');

exports.getTempleInfo = async (req, res) => {
  try {
    const info = await templeService.getTempleDetails();
    res.json(info);
  } catch (error) {
    console.error('Error fetching temple info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
