const mongoose = require("mongoose");

// Replace this with your MongoDB connection string
const DB_URL = "mongodb://127.0.0.1:27017/crud-db";

const testConnection = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB successfully!");
        process.exit(0); // Exit the process after successful connection
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1); // Exit with failure
    }
};

testConnection();
