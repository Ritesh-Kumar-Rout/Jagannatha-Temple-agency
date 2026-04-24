const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/authMiddleware');
const { upload, createController } = require('../controllers/cmsController');

// Import Models
const Ritual = require('../models/Ritual');
const Stay = require('../models/Stay');
const Travel = require('../models/Travel');
const Food = require('../models/Food');
const Attraction = require('../models/Attraction');
const Event = require('../models/Event');

// Create Controllers
const ritualCtrl = createController(Ritual);
const stayCtrl = createController(Stay);
const travelCtrl = createController(Travel);
const foodCtrl = createController(Food);
const attractionCtrl = createController(Attraction);
const eventCtrl = createController(Event);

// Helper to setup routes
const setupRoutes = (path, controller) => {
  // Public read routes
  router.get(`/public/${path}`, controller.getAll);
  router.get(`/public/${path}/:id`, controller.getOne);

  // Admin write routes
  router.post(`/admin/${path}`, protectAdmin, upload.single('image'), controller.create);
  router.put(`/admin/${path}/:id`, protectAdmin, upload.single('image'), controller.update);
  router.delete(`/admin/${path}/:id`, protectAdmin, controller.remove);
};

// Setup all modules
setupRoutes('rituals', ritualCtrl);
setupRoutes('stays', stayCtrl);
setupRoutes('travels', travelCtrl);
setupRoutes('foods', foodCtrl);
setupRoutes('attractions', attractionCtrl);
setupRoutes('events', eventCtrl);

module.exports = router;
