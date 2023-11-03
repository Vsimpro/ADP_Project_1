import express from "express";
import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

/* POST */
// this route is used for signing up a new user (could be changed to /signup)
userRouter.post("/create-user", (request, response) => {
    console.log("[>] POST '/create-user'");

    // Hash password
    const { password } = request.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds)
        .then((hash) => {
            console.log("[*] Password hashed!");
            request.body.password = hash;

            var newUser = new userModel(request.body);
            return newUser.save();
        })
        .then((user) => {
            console.log("[*] User created!", user._id);
            response.status(201).send(user);
        })
        .catch((error) => {
            console.log("[!] Error creating user", error);
            response.status(400).send(error);
        });
});

// Route for logging in a user
userRouter.post("/login", (request, response) => {
    console.log("[>] POST '/login'");

    userModel.findOne({ email: request.body.email })
        .then((user) => {
            console.log("[*] User found!", user._id);

            bcrypt.compare(request.body.password, user.password)
                .then((result) => {
                    if (!result){
                        throw new Error("Passwords don't match!");
                    }
                    console.log("[*] Passwords match!");
                    response.status(200).send(user._id);
                })
                .catch((error) => {
                    console.log("[!] Passwords don't match!", error);
                    response.status(401).send(error);
                });
        })
        .catch((error) => {
            console.log("[!] User doesn't exist or passwords don't match!", error);
            response.status(400).send(error);
        });
});

/* GET */
userRouter.get("/get-user/:id", (request, response) => {
    console.log("[>] GET '/get-user/:id'");
    console.log("User ID", request.params.id);

    userModel.findById(request.params.id)
        .then((user) => {
            console.log("[*] User found!", user._id);
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
            console.log("[*] User deleted!", user._id);
            response.status(204).send(user);
        })
        .catch((error) => {
            console.log("[!] Error deleting user", error);
            response.status(400).send(error);
        });
});

export default userRouter;