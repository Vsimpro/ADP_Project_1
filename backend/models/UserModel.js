import { Schema, model } from 'mongoose';

// create a schema for the user model
// create a model from the schema
// export the model

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	projects: [{ type: String, required: false }],
	connections: [{ type: String, required: false }]
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const userModel = model("User", userSchema);

export default userModel;

/* example user document
request to server // json:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secretpassword",
  "projects": ["Project A", "Project B"],
  "connections": ["User A", "User B"]
}

response from server // json:
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secretpassword",
    "projects": [
        "Project A",
        "Project B"
    ],
    "connections": [
        "User A",
        "User B"
    ],
    "_id": "65285469fc0f35b7f5ad3992",
    "createdAt": "2023-10-12T20:17:45.410Z",
    "updatedAt": "2023-10-12T20:17:45.410Z",
    "__v": 0
}
*/
