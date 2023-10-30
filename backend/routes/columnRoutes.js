import express from 'express';
import columnModel from '../models/ColumnModel.js';

const columnRouter = express.Router();

/* POST */
columnRouter.post("/create-column", (request, response) => {
	console.log("[>] POST '/create-column'");
	console.log("Column data", request.body);

	var newColumn = new columnModel(request.body);
	newColumn.save()
		.then((column) => {
			console.log("[*] Column created!", column);
			response.status(201).send(column);
		})
		.catch((error) => {
			console.log("[!] Error creating column", error);
			response.status(400).send(error);
		});
});

/* GET */
columnRouter.get("/get-column/:id", (request, response) => {
	console.log("[>] GET '/get-column/:id'");
	console.log("Column ID", request.params.id);

	columnModel.findById(request.params.id)
		.then((column) => {
			console.log("[*] Column found!", column);
			response.status(200).send(column);
		})
		.catch((error) => {
			console.log("[!] Error finding column", error);
			response.status(404).send(error);
		}
	);
});

/* PATCH */
columnRouter.patch("/update-column/:id", (request, response) => {
	console.log("[>] PATCH '/update-column/:id'");
	console.log("Column ID", request.params.id);
	console.log("Column data", request.body);

	columnModel.findByIdAndUpdate(request.params.id, request.body, { new: true })
		.then((column) => {
			console.log("[*] Column updated!", column);
			response.status(200).send(column);
		})
		.catch((error) => {
			console.log("[!] Error updating column", error);
			response.status(400).send(error);
		}
	);
});

/* DELETE */
columnRouter.delete("/delete-column/:id", (request, response) => {
	console.log("[>] DELETE '/delete-column/:id'");
	console.log("Column ID", request.params.id);

	columnModel.findByIdAndDelete(request.params.id)
		.then((column) => {
			console.log("[*] Column deleted!", column);
			response.status(204).send(column);
		})
		.catch((error) => {
			console.log("[!] Error deleting column", error);
			response.status(400).send(error);
		}
	);
});

export default columnRouter;