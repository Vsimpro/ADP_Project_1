import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";


var MONGODB_URI = process.env.MONGODB_URI;

// Create MongoDB connection and check that it works:
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const { connection } = mongoose;
connection.on("error", console.error.bind(console, "[!] MongoDB connection error:"));
connection.once("open", () => {
    console.log("[*] MongoDB connected.")
});

export default connection;