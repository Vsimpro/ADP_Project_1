/* Imports */
const cors    = require("cors");
const express = require("express");
require("dotenv").config();


/* Modules */
//TODO: Add if needed


/* Global Variables */
var HOST = process.env.HOST;
var PORT = process.env.PORT;

// Check that .env exists:
if ((HOST == undefined) || (PORT == undefined)) {
    console.log( "[!] HOST or PORT not found from .env .. does .env exist?\n..exiting." )
    process.exit(1)
}


// Prepare Express:
const app = express();
app.use(express.json());
app.listen(PORT, function() { 
    console.log("[*] Server starting on http://" + HOST + ":" + PORT) 
});


/* Routes */
app.get("/", function(request, response) {
    console.log("[>] GET '/'");
    response.status(200).send("Hello World!"); 
    return 0; 
});

// Catch 404, TODO: Show what page is requested.
app.get("/*", function(request, response) {
    console.log("[>] GET '/?', no page.");
    response.status(404).send("Page Not Found."); 
    return 0; 
});
