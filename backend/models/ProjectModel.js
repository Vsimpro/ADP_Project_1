import { Schema, model } from "mongoose";
import commentModel from "./CommentModel.js";

const projectSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: false },
	owner: { type: String, required: true },
	readWrite: { type: Array, required: true },
	readOnly: { type: Array, required: false },
	comments: [{ type: commentModel.schema, required: false }],
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const projectModel = model("Project", projectSchema);

export default projectModel;

/* example project document
request to server // json:
{
  "name": "Test project",
  "description": "This is a test project",
  "owner": "65285469fc0f35b7f5ad3992",
  "readWrite":["65285469fc0f35b7f5ad3992","user2_ID"],
  "readOnly": [],
  "comments": [
      {
          "user": "65285469fc0f35b7f5ad3992",
          "text": "this is a comment"
      }
  ]
}

response from server // json:

{
    "name": "Test project",
    "description": "This is a test project",
    "owner": "65285469fc0f35b7f5ad3992",
    "readWrite": [
        "65285469fc0f35b7f5ad3992",
        "user2_ID"
    ],
    "readOnly": [],
    "comments": [
        {
            "user": "65285469fc0f35b7f5ad3992",
            "text": "this is a comment"
        }
    ],
    "_id": "652863acbe5ed46c285e84c3",
    "createdAt": "2023-10-12T21:22:52.239Z",
    "updatedAt": "2023-10-12T21:22:52.239Z",
    "__v": 0
}
*/