import { Schema, model } from 'mongoose';

// create a schema for the user model
// create a model from the schema
// export the model

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	projects: { type: Array, required: false },
	connections: { type: Array, required: false },
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const userModel = model("User", userSchema);

export default userModel;