import { Schema,model } from "mongoose";
import cardModel from "./CardModel.js";

const columnSchema = new Schema({
	order: { type: Number, required: true },
	name: { type: String, required: true },
	cards: [{ type: cardModel.schema, required: false }],
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const columnModel = model("Column", columnSchema);

export default columnModel;