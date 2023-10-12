const mongoose = require("mongoose");

var MONGODB_URI = process.env.MONGODB_URI;

// Create MongoDB connection and check that it works:
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "[!] MongoDB connection error:"));
db.once("open", () => {
    console.log("[*] MongoDB connected.")
});

module.exports = db;