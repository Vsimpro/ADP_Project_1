import express from "express";
import userModel from "../models/UserModel.js";

const userRouter = express.Router();
// user routes:
userRouter.post("/create-user", (request, response) => { 
    console.log("[>] POST '/create-user'");
    console.log("User data", request.body);

    var newUser = new userModel(request.body);
    newUser.save()
        .then((user) => {
            console.log("[*] User created!", user);
            response.status(200).send(user);
        })
        .catch((error) => {
            console.log("[!] Error creating user", error);
            response.status(400).send(error);
        });
});

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
            response.status(400).send(error);
        });
});

export default userRouter;