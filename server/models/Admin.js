const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    sparse: true, // allows null/undefined values to not fail unique constraint if one of email/mobile is used
  },
  mobile: {
    type: String,
    required: false,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin'],
  }
}, { timestamps: true });

// Ensure at least email or mobile is provided
adminSchema.pre('validate', function() {
  if (!this.email && !this.mobile) {
    throw new Error('Either email or mobile number must be provided.');
  }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
