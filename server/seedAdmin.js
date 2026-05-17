require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin'); // Adjust path if needed

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding.');

    const shouldResetPassword = process.argv.includes('--reset-password');

    // Default credentials
    const defaultEmail = 'admin@jagannath.com';
    const defaultMobile = '9999999999';
    const defaultPassword = 'adminpassword123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ email: defaultEmail }, { mobile: defaultMobile }]
    });

    if (existingAdmin) {
      if (!shouldResetPassword) {
        console.log('Admin user already exists. Seed skipped.');
        console.log('Run `npm run seed:admin:reset` to reset the default admin password.');
        process.exit(0);
      }

      const salt = await bcrypt.genSalt(10);
      existingAdmin.password = await bcrypt.hash(defaultPassword, salt);
      existingAdmin.email = existingAdmin.email || defaultEmail;
      existingAdmin.mobile = existingAdmin.mobile || defaultMobile;
      existingAdmin.role = 'admin';
      await existingAdmin.save();

      console.log('Admin password reset successfully!');
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Mobile: ${existingAdmin.mobile}`);
      console.log(`Password: ${defaultPassword}`);
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
