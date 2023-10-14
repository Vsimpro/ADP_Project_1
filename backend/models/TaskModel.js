import { Schema, model } from 'mongoose';
import commentModel from './CommentModel.js';

const taskSchema = new Schema({
	name: { type: String, required: true },
	createdBy: { type: String, required: true },
	isDone: { type: Boolean, required: true },
	doneBy: { type: String, required: false },
}, {
	timestamps: true, // creates createdAt and updatedAt fields automatically
});

const taskModel = model('Task', taskSchema);

export default taskModel;