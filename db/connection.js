const mongoose = require('mongoose');
const dns = require('dns');

// Use Google DNS for SRV record resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(`MongoDB Connection Attempt ${i + 1} Error: ${error.message}`);
      if (i === retries - 1) {
        console.error('All connection attempts failed');
        process.exit(1);
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
};

module.exports = connectDB;
