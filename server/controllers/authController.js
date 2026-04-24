const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Ensure you have JWT_SECRET in your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_please_change';

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or mobile

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email/mobile and password.' });
    }

    // Check if identifier is an email or mobile
    const isEmail = identifier.includes('@');
    const query = isEmail ? { email: identifier } : { mobile: identifier };

    const admin = await Admin.findOne(query);

    if (!admin) {
      // Don't reveal that the user doesn't exist
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    if (admin.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized access.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Create JWT payload
    const payload = {
      id: admin._id,
      role: admin.role,
    };

    // Generate token (expires in 1 day)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    // Set cookie
    // In production, secure should be true
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

const logout = (req, res) => {
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ success: true, message: 'Logged out successfully.' });
};

const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }
    res.status(200).json({ success: true, admin });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const updateMe = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;

    const admin = await Admin.findByIdAndUpdate(req.admin.id, updateData, { new: true, runValidators: true }).select('-password');
    
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }
    res.status(200).json({ success: true, message: 'Profile updated successfully', admin });
  } catch (error) {
    console.error('Update me error:', error);
    // Handle duplicate key error for email/mobile
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email or Mobile already in use by another admin.' });
    }
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    // In a real app, query the database. For now, we return mock values that look realistic.
    const stats = {
      totalBookings: 1248,
      activeUsers: 842,
      revenue: '$12,450',
      revenueChange: '+18%',
      bookingsChange: '+12%',
      usersChange: '+5%',
    };
    res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = {
  login,
  logout,
  getMe,
  updateMe,
  getDashboardStats,
};
