/* Imports */
import cors from "cors";
import express, { json } from "express";
import mongoose from "mongoose";
require("dotenv").config();
import db from "./db.js";
import UserModel from "./models/UserModel.js"; // TODO: Remove this line if not needed here.

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
app.listen(PORT, function () {
    console.log("[*] Server starting on http://" + HOST + ":" + PORT)
});


/* Routes */
app.get("/", function (request, response) {
    console.log("[>] GET '/'");
    response.status(200).send("Hello World!");
    return 0;
});

// Catch 404, TODO: Show what page is requested.
app.get("/*", function (request, response) {
    console.log("[>] GET '/?', no page.");
    response.status(404).send("Page Not Found.");
    return 0;
});

app.post("/create-user", function (request, response) {
    console.log("[>] POST '/create-user'");
    console.log("User data", request.body);

    var newUser = new UserModel(request.body);
    newUser.save()
        .then((user) => {
            console.log("[*] User created!", user);
            response.status(200).send(user);
        })
        .catch((error) => {
            console.log("[!] Error creating user", error);
            response.status(400).send(error);
        });
});
