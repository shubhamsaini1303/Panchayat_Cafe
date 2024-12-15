

// Import mongoose and dotenv
// require('dotenv').config();
const mongoose = require('mongoose');

const database = () => {
  // MongoDB connection URL
  const MONGO_URI = process.env.MONGO_URI;

  // Function to connect to the database
  const connectToDatabase = async () => {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit process with failure
    }
  };

  // Call the function to connect to the database
  connectToDatabase();
}

module.exports = database;
