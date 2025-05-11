const mongoose = require("mongoose");

// Connect to MongoDB without deprecated options UwrFa9kmtLNrMF7i   achrafkhmirii
mongoose.connect("mongodb+srv://achrafkhmirii:1L2CloQW3brXyKjD@cluster0.f5hjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error:", error));

// Expose the database connection 
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));

module.exports = db;