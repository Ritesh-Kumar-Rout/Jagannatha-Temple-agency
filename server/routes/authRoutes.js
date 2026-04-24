const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { login, logout, getMe, updateMe, getDashboardStats } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message: { success: false, message: 'Too many login attempts, please try again later.' }
});

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', protectAdmin, getMe);
router.put('/me', protectAdmin, updateMe);
router.get('/dashboard-stats', protectAdmin, getDashboardStats);

module.exports = router;
