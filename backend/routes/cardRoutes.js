import express from 'express';
import cardModel from '../models/CardModel.js';

const cardRouter = express.Router();

/* POST */
cardRouter.post("/create-card", (request, response) => {
	console.log("[>] POST '/create-card'");
	console.log("Card data", request.body);

	var newCard = new cardModel(request.body);
	newCard.save()
		.then((card) => {
			console.log("[*] Card created!", card);
			response.status(201).send(card);
		})
		.catch((error) => {
			console.log("[!] Error creating card", error);
			response.status(400).send(error);
		});
});

/* GET */
cardRouter.get("/get-card/:id", (request, response) => {
	console.log("[>] GET '/get-card/:id'");
	console.log("Card ID", request.params.id);

	cardModel.findById(request.params.id)
		.then((card) => {
			console.log("[*] Card found!", card);
			response.status(200).send(card);
		})
		.catch((error) => {
			console.log("[!] Error finding card", error);
			response.status(404).send(error);
		}
	);
});

/* PATCH */
cardRouter.patch("/update-card/:id", (request, response) => {
	console.log("[>] PATCH '/update-card/:id'");
	console.log("Card ID", request.params.id);
	console.log("Card data", request.body);

	cardModel.findByIdAndUpdate(request.params.id, request.body, { new: true })
		.then((card) => {
			console.log("[*] Card updated!", card);
			response.status(200).send(card);
		})
		.catch((error) => {
			console.log("[!] Error updating card", error);
			response.status(400).send(error);
		}
	);
});

/* DELETE */
cardRouter.delete("/delete-card/:id", (request, response) => {
	console.log("[>] DELETE '/delete-card/:id'");
	console.log("Card ID", request.params.id);

	cardModel.findByIdAndDelete(request.params.id)
		.then((card) => {
			console.log("[*] Card deleted!", card);
			response.status(204).send(card);
		})
		.catch((error) => {
			console.log("[!] Error deleting card", error);
			response.status(400).send(error);
		}
	);
});

export default cardRouter;