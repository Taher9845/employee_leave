const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const uri = process.env.MONGO_URL || 'mongodb://localhost:27017/leave_app';
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};
