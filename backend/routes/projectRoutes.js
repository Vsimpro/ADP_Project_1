import express from 'express';
import projectModel from '../models/ProjectModel.js';

const projectRouter = express.Router();

// project routes:
projectRouter.post("/create-project", (request, response) => {
    console.log("[>] POST '/create-project'");
    console.log("Project data", request.body);

    var newProject = new projectModel(request.body);
    newProject.save()
        .then((project) => {
            console.log("[*] Project created!", project);
            response.status(200).send(project);
        })
        .catch((error) => {
            console.log("[!] Error creating project", error);
            response.status(400).send(error);
        });
});

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
            response.status(400).send(error);
        }
    );
});

export default projectRouter;