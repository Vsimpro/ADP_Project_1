import express from 'express';
import commentModel from '../models/CommentModel.js';

const commentRouter = express.Router();

/* POST */
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

/* GET */
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

/* PATCH */
commentRouter.patch("/update-comment/:id", (request, response) => {
	console.log("[>] PATCH '/update-comment/:id'");
	console.log("Comment ID", request.params.id);
	console.log("Comment data", request.body);

	commentModel.findByIdAndUpdate(request.params.id, request.body, { new: true })
		.then((comment) => {
			console.log("[*] Comment updated!", comment);
			response.status(200).send(comment);
		})
		.catch((error) => {
			console.log("[!] Error updating comment", error);
			response.status(400).send(error);
		}
	);
});

/* DELETE */
commentRouter.delete("/delete-comment/:id", (request, response) => {
	console.log("[>] DELETE '/delete-comment/:id'");
	console.log("Comment ID", request.params.id);

	commentModel.findByIdAndDelete(request.params.id)
		.then((comment) => {
			console.log("[*] Comment deleted!", comment);
			response.status(200).send(comment);
		})
		.catch((error) => {
			console.log("[!] Error deleting comment", error);
			response.status(400).send(error);
		}
	);
});

export default commentRouter;