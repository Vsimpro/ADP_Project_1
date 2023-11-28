import express from 'express';
import taskModel from '../models/TaskModel.js';
import { formatTask } from "../middleware/validationsMiddleware.js";
import { validateJWT, getOwnerOf, isLoggedIn } from '../middleware/jwtMiddleware.js'; 


const taskRouter = express.Router();

/* POST */
taskRouter.post("/create-task", (request, response) => {
	console.log("[>] POST '/create-task'");
	console.log("Task data", request.body);

	var id;
	let sendError = false; // If token can't be verified, or a problem arises.

	try {
		let token 	= request.cookies["Bearer"]
		let _id 	= getOwnerOf( token );

		if( !isLoggedIn( token )) {
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


	let formattedTask = formatTask(request.body, id);
	if (formattedTask == undefined) {
		console.log( "[!] Could not create a new task." )
		response.status(500).send("Malformed request.");
		return;
	}
	
	var newTask = new taskModel(formattedTask, id);
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
	
	// TOOD: Validate.
	var task_body = request.body;
	var task_id   = request.params.id;

	var id; // TODO: Check permissions with this later.
	var sendError = false; // If token can't be verified, or a problem arises.

	try {
		let token 	= request.cookies["Bearer"]
		let _id 	= getOwnerOf( token );

		if( !isLoggedIn( token )) {
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

	// TODO: Validate new Task Body somehow
	taskModel.findByIdAndUpdate(task_id, task_body, { new: true })
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

		
	// TOOD: Validate.
	var task_id   = request.params.id;

	var id; // TODO: Use this to check permissions
	let sendError = false; // If token can't be verified, or a problem arises.

	try {
		let token 	= request.cookies["Bearer"]
		let _id 	= getOwnerOf( token );

		if( !isLoggedIn( token )) {
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

	taskModel.findByIdAndDelete(task_id)
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