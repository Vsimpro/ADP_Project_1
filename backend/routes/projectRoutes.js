import express from 'express';
import projectModel from '../models/ProjectModel.js';
import { handleSocketConnections } from '../controller/socket.js';
import { validateJWT, getOwnerOf, isLoggedIn } from '../middleware/jwtMiddleware.js';

const projectRouter = express.Router();

/* POST */
projectRouter.post("/create-project", (request, response) => {
    console.log("[>] POST '/create-project'");
    console.log("Project data", request.body);

    var id; // TODO: Use this to check permissions
    var sendError = false; // If token can't be verified, or a problem arises.

    try {
        let token = request.cookies["Bearer"]
        let _id = getOwnerOf(token);

        if (!isLoggedIn(token)) {
            sendError = true;
        }

        if ((_id == null) || (_id == undefined)) {
            sendError = true;

        } else {
            id = _id;
        }

    } catch (e) {
        console.log("[!] Error: " + e)
        sendError = true;
    }

    if (sendError) {
        console.log("[!] Could not validate token")
        response.status(401).send("Invalid token.");
        return;
    }

    // Validate body??
    var newProject = new projectModel(request.body);
    newProject.save()
        .then((project) => {
            console.log("[*] Project created!", project);
            response.status(201).send(project);
        })
        .catch((error) => {
            console.log("[!] Error creating project", error);
            response.status(400).send(error);
        });
});

/* GET */

// GET project by ID
projectRouter.get("/get-project/:id", (request, response) => {
    console.log("[>] GET '/get-project/:id'");
    console.log("Project ID", request.params.id);

    projectModel.findById(request.params.id)
        .then((project) => {
            console.log("[*] Project found!", project);
            response.status(200).send(project);
        })
        .catch((error) => {
            console.log("[!] Error finding project", error);
            response.status(404).send(error);
        });
});

// GET projects by user ID
projectRouter.get("/get-projects-by-user/:id", (request, response) => {
    const userID = request.params.id;
    console.log("userID :", userID);
    console.log("[>] GET '/get-projects-by-user/:id'");

    projectModel.find({ $or: [{ owner: userID }, { readWrite: userID }, { readOnly: userID }] })
        .then((projects) => {
            console.log("[*] Projects found!", projects);
            response.status(200).send(projects);
        })
        .catch((error) => {
            console.log("[!] Error finding projects by userID", error);
            response.status(404).send(error);
        });
});


/* PATCH */
projectRouter.patch("/update-project/:id", (request, response) => {
    console.log("[>] PATCH '/update-project/:id'");
    console.log("Project ID", request.params.id);
    console.log("Project data", request.body);

    var id;
    let sendError = false; // If token can't be verified, or a problem arises.

    try {
        let token = request.cookies["Bearer"]
        let valid = validateJWT(token);

        if (!valid) {
            sendError = true;
        }

        id = _id;

    } catch (error) {
        console.log(error)
        sendError = true;
    }

    if (sendError) {
        console.log("[!] Could not validate token")
        response.status(401).send("Invalid token.");
        return;
    }

    projectModel.findByIdAndUpdate(request.params.id, request.body, { new: true })
        .then((project) => {
            // Lähetä päivitys kaikille projektin käyttäjille:
            handleSocketConnections.emitProjectUpdate(request.params.id);

            console.log("[*] Project updated!", project);
            response.status(200).send(project);
        })
        .catch((error) => {
            console.log("[!] Error updating project", error);
            response.status(400).send(error);
        });
});


/* DELETE */
projectRouter.delete("/delete-project/:id", (request, response) => {
    console.log("[>] DELETE '/delete-project/:id'");
    console.log("Project ID", request.params.id);

    projectModel.findByIdAndDelete(request.params.id)
        .then((project) => {
            console.log("[*] Project deleted!", project);
            response.status(204).send(project);
        })
        .catch((error) => {
            console.log("[!] Error deleting project", error);
            response.status(400).send(error);
        });
});

export default projectRouter;