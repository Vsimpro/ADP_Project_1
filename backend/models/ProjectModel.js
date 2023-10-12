import { Schema, model } from "mongoose";

const projectSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: false },
	owner: { type: String, required: true },
	readWrite: { type: Array, required: true },
	readOnly: { type: Array, required: false },
	comments: { type: Array, required: false },
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const projectModel = model("Project", projectSchema);

export default projectModel;
