const mongoose = require('mongoose');

// create a schema for the user model
// create a model from the schema
// export the model

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;