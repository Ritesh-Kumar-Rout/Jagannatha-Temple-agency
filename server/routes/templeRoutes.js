const express = require('express');
const router = express.Router();
const templeController = require('../controllers/templeController');

router.get('/', templeController.getTempleInfo);

module.exports = router;
