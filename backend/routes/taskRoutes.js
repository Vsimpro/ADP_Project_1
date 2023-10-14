import express from 'express';
import taskModel from '../models/TaskModel.js';

const taskRouter = express.Router();

/* POST */
taskRouter.post("/create-task", (request, response) => {
	console.log("[>] POST '/create-task'");
	console.log("Task data", request.body);

	var newTask = new taskModel(request.body);
	newTask.save()
		.then((task) => {
			console.log("[*] Task created!", task);
			response.status(201).send(task);
		})
		.catch((error) => {
			console.log("[!] Error creating task", error);
			response.status(400).send(error);
		});
});

/* GET */
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
			response.status(404).send(error);
		}
	);
});

/* PATCH */
taskRouter.patch("/update-task/:id", (request, response) => {
	console.log("[>] PATCH '/update-task/:id'");
	console.log("Task ID", request.params.id);
	console.log("Task data", request.body);

	taskModel.findByIdAndUpdate(request.params.id, request.body, { new: true })
		.then((task) => {
			console.log("[*] Task updated!", task);
			response.status(200).send(task);
		})
		.catch((error) => {
			console.log("[!] Error updating task", error);
			response.status(400).send(error);
		}
	);
});

/* DELETE */
taskRouter.delete("/delete-task/:id", (request, response) => {
	console.log("[>] DELETE '/delete-task/:id'");
	console.log("Task ID", request.params.id);

	taskModel.findByIdAndDelete(request.params.id)
		.then((task) => {
			console.log("[*] Task deleted!", task);
			response.status(204).send(task);
		})
		.catch((error) => {
			console.log("[!] Error deleting task", error);
			response.status(400).send(error);
		}
	);
});

export default taskRouter;