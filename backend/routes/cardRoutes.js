import express from 'express';
import cardModel from '../models/CardModel.js';
import { io } from '../index.js';
import { validateJWT, getOwnerOf, isLoggedIn } from '../middleware/jwtMiddleware.js'; 

const cardRouter = express.Router();

/* POST */
cardRouter.post("/create-card", (request, response) => {
	console.log("[>] POST '/create-card'");
	console.log("Card data", request.body);

	var id;
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

	// Validate body ??
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

cardRouter.get("/get-all-cards/:id", (request, response) => {
	console.log("[>] GET '/get-all-cards/:id'");
	console.log("User ID", request.params.id);

	cardModel.find({ userId: request.params.id })
		.then((cards) => {
			if (cards.length === 0) {
				throw new Error("No cards found!");
			}
			console.log("[*] Cards found!");
			console.log(cards.forEach((card) => console.log(card._id)));
			response.status(200).send(cards);
		})
		.catch((error) => {
			console.log("[!] Error finding cards", error);
			response.status(404).send(error);
		}
	);
});

/* PATCH */
cardRouter.patch("/update-card/:id", (request, response) => {
	console.log("[>] PATCH '/update-card/:id'");
	console.log("Card ID", request.params.id);
	console.log("Card data", request.body);

	var card_body = request.body;
	var card_id   = request.params.id;

	var id; // Use this to validate Ownership later.
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

	// TODO: Do validations to body
	cardModel.findByIdAndUpdate(card_id, card_body, { new: true })
		.then((card) => {
			console.log("[*] Card updated!", card);

			io.emit('cardUpdated', card);

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

	var card_id   = request.params.id;

	var id; // Use this to validate Ownership later.
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

	cardModel.findByIdAndDelete(card_id)
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