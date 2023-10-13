import { Schema, model } from "mongoose";
import commentModel from "./CommentModel.js";
import taskModel from "./TaskModel.js";

const cardSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: false },
	createdBy: { type: String, required: true },
	assignedTo: { type: String, required: false },
	comments: [{ type: commentModel.schema, required: false }],
	tasks: [{ type: taskModel.schema, required: false }],
	isDone: { type: Boolean, required: true },
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const cardModel = model("Card", cardSchema);

export default cardModel;