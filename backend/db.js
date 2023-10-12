import { connect, connection } from "mongoose";

var MONGODB_URI = process.env.MONGODB_URI;

// Create MongoDB connection and check that it works:
connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = connection;
db.on("error", console.error.bind(console, "[!] MongoDB connection error:"));
db.once("open", () => {
    console.log("[*] MongoDB connected.")
});

export default db;