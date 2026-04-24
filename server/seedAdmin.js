require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin'); // Adjust path if needed

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ratha_yatra_chatbot');
    console.log('MongoDB connected for seeding.');

    // Default credentials
    const defaultEmail = 'admin@jagannath.com';
    const defaultMobile = '9999999999';
    const defaultPassword = 'adminpassword123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ email: defaultEmail }, { mobile: defaultMobile }]
    });

    if (existingAdmin) {
      console.log('Admin user already exists. Seed skipped.');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, salt);

    // Create admin
    const admin = new Admin({
      name: 'Super Admin',
      email: defaultEmail,
      mobile: defaultMobile,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin seeded successfully!');
    console.log(`Email: ${defaultEmail}`);
    console.log(`Mobile: ${defaultMobile}`);
    console.log(`Password: ${defaultPassword}`);
    console.log('PLEASE CHANGE PASSWORD IN PRODUCTION!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
