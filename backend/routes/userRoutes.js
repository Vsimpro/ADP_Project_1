import express from "express";
import userModel from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../middleware/bcryptMiddleware.js";
import { generateJWT, isLoggedIn, validateOwnership } from "../middleware/jwtMiddleware.js";

const userRouter = express.Router();

/* POST */
// this route is used for signing up a new user (could be changed to /signup)
userRouter.post("/create-user", (request, response) => {
    console.log("[>] POST '/create-user'");

    hashPassword(request, response, () => {
        // Salasana on nyt hashattu
        var newUser = new userModel(request.body);
        return newUser.save()
            .then((user) => {
                console.log("[*] User created!", user._id);
                //palautetaan clientille JWT, jossa pelkkä ID.
                response.status(201).send( { id : user._id, token : generateJWT(user._id) } );
            })
            .catch((error) => {
                if (error.code === 11000) {
                    console.log("[!] Email already exists");
                    response.status(409).send("Email already exists");
                } else {
                    console.log("[!] Error creating user", error);
                    response.status(400).send(error);
                }
            })
    });
});

// Route for logging in a user
userRouter.post("/login", (request, response) => {
    console.log("[>] POST '/login'");

    const { email, password } = request.body;

    userModel.findOne({ email })
        .then((user) => {
            if (!user) {
                console.log("[!] User not found");
                response.status(401).send("User not found");
            } else {
                console.log("[*] User found!", user._id);
                request.body = { password, hash: user.password };
                comparePassword(request, response, () => {
                    // Salasanat vastaavat
                    // palautetaan clientille pelkkä id jolla voidaan hakea loput tiedot
                    response.status(200).send( { id : user._id, token : generateJWT(user._id) } );
                });
            }
        })
        .catch((error) => {
            console.log("[!] Error logging in", error);
            response.status(400).send(error);
        });
});

/* GET */
userRouter.get("/get-user/:id", (request, response) => {
    console.log("[>] GET '/get-user/:id'");
    console.log("User ID", request.params.id);
    
    var sendError = false; // If token can't be verified, or a problem arises.
    var user_id   = request.params.id;

    try {
        let token 	= request.cookies["Bearer"]

        if( !isLoggedIn( token )) {
			sendError = true;
		}

        if ( !validateOwnership(token, user_id) ) {
            sendError = true;
        }           

    } catch (error) {
        console.log( "[!] Error: " + error )
        sendError = true;
    }   

    if (sendError) {
		console.log("[!] Could not validate token")
        response.status(401).send("Invalid token.");
        return;
	}

    userModel.findById(user_id)
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

    var sendError = false; // If token can't be verified, or a problem arises.
    var user_id   = request.params.id;

    try {
        let token 	= request.cookies["Bearer"]

        if( !isLoggedIn( token )) {
			sendError = true;
		}

        if ( !validateOwnership(token, user_id) ) {
            sendError = true;
        }           

    } catch (error) {
        console.log( "[!] Error: " + error )
        sendError = true;
    }   

    if (sendError) {
		console.log("[!] Could not validate token")
        response.status(401).send("Invalid token.");
        return;
	}

    // TODO: Validate body? 
    userModel.findByIdAndUpdate(user_id, request.body, { new: true })
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

    var sendError = false; // If token can't be verified, or a problem arises.
    var user_id   = request.params.id;

    try {
        let token 	= request.cookies["Bearer"]

        if( !isLoggedIn( token )) {
			sendError = true;
		}

        if ( !validateOwnership(token, user_id) ) {
            sendError = true;
        }           

    } catch (error) {
        console.log( "[!] Error: " + error )
        sendError = true;
    }   

    if (sendError) {
		console.log("[!] Could not validate token")
        response.status(401).send("Invalid token.");
        return;
	}
    
    userModel.findByIdAndDelete(user_id)
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