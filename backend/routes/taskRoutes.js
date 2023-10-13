import express from 'express';
import taskModel from '../models/TaskModel.js';

const taskRouter = express.Router();

// task routes:
taskRouter.post("/create-task", (request, response) => {
	console.log("[>] POST '/create-task'");
	console.log("Task data", request.body);

	var newTask = new taskModel(request.body);
	newTask.save()
		.then((task) => {
			console.log("[*] Task created!", task);
			response.status(200).send(task);
		})
		.catch((error) => {
			console.log("[!] Error creating task", error);
			response.status(400).send(error);
		});
});

taskRouter.get("/get-task/:id", (request, response) => {
	console.log("[>] GET '/get-task/:id'");
	console.log("Task ID", request.params.id);

	taskModel.findById(request.params.id)
		.then((task) => {
			console.log("[*] Task found!", task);
			response.status(200).send(task);
		})
		.catch((error) => {
			console.log("[!] Error finding task", error);
			response.status(400).send(error);
		}
	);
});

export default taskRouter;