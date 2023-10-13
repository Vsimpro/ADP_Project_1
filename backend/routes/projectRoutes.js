import express from 'express';
import projectModel from '../models/ProjectModel.js';

const projectRouter = express.Router();

/* POST */
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

/* GET */
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

/* PATCH */
projectRouter.patch("/update-project/:id", (request, response) => {
    console.log("[>] PATCH '/update-project/:id'");
    console.log("Project ID", request.params.id);
    console.log("Project data", request.body);

    projectModel.findByIdAndUpdate(request.params.id, request.body, { new: true })
        .then((project) => {
            console.log("[*] Project updated!", project);
            response.status(200).send(project);
        })
        .catch((error) => {
            console.log("[!] Error updating project", error);
            response.status(400).send(error);
        }
    );
});


/* DELETE */
projectRouter.delete("/delete-project/:id", (request, response) => {
    console.log("[>] DELETE '/delete-project/:id'");
    console.log("Project ID", request.params.id);

    projectModel.findByIdAndDelete(request.params.id)
        .then((project) => {
            console.log("[*] Project deleted!", project);
            response.status(200).send(project);
        })
        .catch((error) => {
            console.log("[!] Error deleting project", error);
            response.status(400).send(error);
        }
    );
});

export default projectRouter;