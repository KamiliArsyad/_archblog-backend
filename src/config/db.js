// This file is used as an entry point for the database connection and other database related configurations.
// The file uses the mongoose module to connect to the MongoDB database using the connection string stored in the MONGO_URI environment variable.
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...".cyan.underline.bold);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);

    process.exit(1);
  }
};

module.exports = connectDB;
