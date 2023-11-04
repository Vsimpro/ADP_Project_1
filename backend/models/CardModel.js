import { Schema, model } from "mongoose";

const cardSchema = new Schema({
	category: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: false },
	userId: [{ type: String, required: true }],
	listItems: [{ type: String, required: false }],
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const cardModel = model("Card", cardSchema);

export default cardModel;

// tässä on vanha model (uusi on testissä)

// const cardSchema = new Schema({
// 	name: { type: String, required: true },
// 	description: { type: String, required: false },
// 	createdBy: { type: String, required: true },
// 	assignedTo: { type: String, required: false },
// 	comments: [{ type: String, required: false }],
// 	tasks: [{ type: String, required: false }],
// 	isDone: { type: Boolean, required: true },
// }, {
// 	timestamps: true, // creates createdAt and updatedAt fields automatically
// });
