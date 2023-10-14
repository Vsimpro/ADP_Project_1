/* Imports */
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { json } from "express";
import db from "./db.js";

/* Routers */
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import columnRouter from "./routes/columnRoutes.js";
import cardRouter from "./routes/cardRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
/* Modules */
//TODO: Add if needed


/* Global Variables */
var HOST = process.env.HOST;
var PORT = process.env.PORT;



// Check that .env exists:
if ((HOST == undefined) || (PORT == undefined)) {
    console.log("[!] HOST or PORT not found from .env .. does .env exist?\n..exiting.")
    process.exit(1)
}


// Prepare Express:
const app = express();
app.use(json());
app.listen(PORT, () => {
    console.log("[*] Server starting on http://" + HOST + ":" + PORT)
});


/* Routes */
app.get("/", (request, response) => {
    console.log("[>] GET '/'");
    response.status(200).send("Hello World!");
    return 0;
});

// Catch 404, TODO: Show what page is requested.
// app.get("/*", function (request, response) {
//     console.log("[>] GET '/?', no page.");
//     response.status(404).send("Page Not Found.");
//     return 0;
// });

// routes:
app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/column", columnRouter);
app.use("/card", cardRouter);
app.use("/task", taskRouter);
app.use("/comment", commentRouter);
