import express from 'express';
import commentModel from '../models/CommentModel.js';

const commentRouter = express.Router();

// comment routes:
commentRouter.post("/create-comment", (request, response) => {
	console.log("[>] POST '/create-comment'");
	console.log("Comment data", request.body);

	var newComment = new commentModel(request.body);
	newComment.save()
		.then((comment) => {
			console.log("[*] Comment created!", comment);
			response.status(200).send(comment);
		})
		.catch((error) => {
			console.log("[!] Error creating comment", error);
			response.status(400).send(error);
		});
});

commentRouter.get("/get-comment/:id", (request, response) => {
	console.log("[>] GET '/get-comment/:id'");
	console.log("Comment ID", request.params.id);

	commentModel.findById(request.params.id)
		.then((comment) => {
			console.log("[*] Comment found!", comment);
			response.status(200).send(comment);
		})
		.catch((error) => {
			console.log("[!] Error finding comment", error);
			response.status(400).send(error);
		}
	);
});

export default commentRouter;