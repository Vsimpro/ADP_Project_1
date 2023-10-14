import express from "express";
import userModel from "../models/UserModel.js";

const userRouter = express.Router();

/* POST */
userRouter.post("/create-user", (request, response) => { 
    console.log("[>] POST '/create-user'");
    console.log("User data", request.body);

    var newUser = new userModel(request.body);
    newUser.save()
        .then((user) => {
            console.log("[*] User created!", user);
            response.status(201).send(user);
        })
        .catch((error) => {
            console.log("[!] Error creating user", error);
            response.status(400).send(error);
        });
});

/* GET */
userRouter.get("/get-user/:id", (request, response) => {
    console.log("[>] GET '/get-user/:id'");
    console.log("User ID", request.params.id);

    userModel.findById(request.params.id)
        .then((user) => {
            console.log("[*] User found!", user);
            response.status(200).send(user);
        })
        .catch((error) => {
            console.log("[!] Error finding user", error);
            response.status(404).send(error);
        });
});

/* PATCH */
userRouter.patch("/update-user/:id", (request, response) => {
    console.log("[>] PATCH '/update-user/:id'");
    console.log("User ID", request.params.id);
    console.log("User data", request.body);

    userModel.findByIdAndUpdate(request.params.id, request.body, { new: true })
        .then((user) => {
            console.log("[*] User updated!", user);
            response.status(200).send(user);
        })
        .catch((error) => {
            console.log("[!] Error updating user", error);
            response.status(400).send(error);
        });
});

/* DELETE */
userRouter.delete("/delete-user/:id", (request, response) => {
    console.log("[>] DELETE '/delete-user/:id'");
    console.log("User ID", request.params.id);
    
    userModel.findByIdAndDelete(request.params.id)
        .then((user) => {
            console.log("[*] User deleted!", user);
            response.status(204).send(user);
        })
        .catch((error) => {
            console.log("[!] Error deleting user", error);
            response.status(400).send(error);
        });
});

export default userRouter;