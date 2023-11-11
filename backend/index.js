/* Imports */
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import cookieParser from "cookie-parser";
import db from "./db.js";
import { handleSocketConnections } from "./controller/socket.js";
import routes from "./routes/router.js";

dotenv.config();

/* Global Variables */
var HOST = process.env.HOST;
var PORT = process.env.PORT;

// Check that .env exists:
if ((HOST == undefined) || (PORT == undefined)) {
    console.log("[!] HOST or PORT not found from .env .. does .env exist?\n..exiting.")
    process.exit(1)
}

// Prepare Express and Socket.io:
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    },

});

app.use(cors());
app.use(json());
app.use(cookieParser());

httpServer.listen(PORT, () => {
    console.log("[*] Server starting on http://" + HOST + ":" + PORT)
});

/* Routes */
app.get("/", (request, response) => {
    console.log("[>] GET '/'");
    response.status(200).send("Hello World!");
    return 0;
});

// Handle Socket.io connections:
handleSocketConnections(io);
// routes:
app.use(routes);