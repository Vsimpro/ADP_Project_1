import { Schema, model } from "mongoose";

const projectSchema = new Schema({
	name: { type: String, required: true },
	owner: { type: String, required: true },
	writeRights: { type: Array, required: true },
	readRights: { type: Array, required: true },
	comments: { type: Array, required: false },
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const projectModel = model("Project", projectSchema);

export default projectModel;
