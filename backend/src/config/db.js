const mongoose = require("mongoose");

let isMongoConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/padartha_ontology";
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Local MongoDB service is offline (${error.message}). Using high-performance Memory/Sync Store seamlessly.`);
    isMongoConnected = false;
  }
};

const getMongoStatus = () => isMongoConnected;

module.exports = { connectDB, getMongoStatus };
