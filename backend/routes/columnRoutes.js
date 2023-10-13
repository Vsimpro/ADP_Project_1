import express from 'express';
import columnModel from '../models/ColumnModel.js';

const columnRouter = express.Router();

// column routes:
columnRouter.post("/create-column", (request, response) => {
	console.log("[>] POST '/create-column'");
	console.log("Column data", request.body);

	var newColumn = new columnModel(request.body);
	newColumn.save()
		.then((column) => {
			console.log("[*] Column created!", column);
			response.status(200).send(column);
		})
		.catch((error) => {
			console.log("[!] Error creating column", error);
			response.status(400).send(error);
		});
});

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
			response.status(400).send(error);
		}
	);
});

export default columnRouter;