import { Schema,model } from "mongoose";

const columnSchema = new Schema({
	order: { type: Number, required: true },
	name: { type: String, required: true },
	items: [{ type: String, required: false }],
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const columnModel = model("Column", columnSchema);

export default columnModel;