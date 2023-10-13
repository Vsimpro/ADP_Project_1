import express from 'express';
import cardModel from '../models/CardModel.js';
import e from 'express';

const cardRouter = express.Router();

// card routes:
cardRouter.post("/create-card", (request, response) => {
	console.log("[>] POST '/create-card'");
	console.log("Card data", request.body);

	var newCard = new cardModel(request.body);
	newCard.save()
		.then((card) => {
			console.log("[*] Card created!", card);
			response.status(200).send(card);
		})
		.catch((error) => {
			console.log("[!] Error creating card", error);
			response.status(400).send(error);
		});
});

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
			response.status(400).send(error);
		}
	);
});

export default cardRouter;