import { Schema, model } from "mongoose";

const commentSchema = new Schema({
	user: { type: String, required: true },
	text: { type: String, required: true },
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const commentModel = model("Comment", commentSchema);

export default commentModel;