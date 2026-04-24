const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_please_change';

const protectAdmin = (req, res, next) => {
  try {
    const token = req.cookies.admin_token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: Admin access required.' });
    }

    req.admin = decoded; // Attach decoded info (id, role) to request
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ success: false, message: 'Not authorized, token failed.' });
  }
};

module.exports = {
  protectAdmin
};
