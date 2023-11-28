import jwt from "jsonwebtoken";

//TODO: Switch to process.env
const SECRET = process.env.SECRET;

/* Helper functions */
// Check if token is 'null', 'undefined' or ''.
function tokenNotNull( token ) {
    if ((token == "") || 
        (token == null) ||
        (token == undefined) ) {
            return false;
    }

    return true;
}


/* Exported functions */
const generateJWT = (id) => { 
    var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 168),
        data: {
            _id : id
        }
    }, 
    SECRET);

    return token;
}

const validateJWT = (token) => { 
    let verified = false;

    if (!tokenNotNull( token )) {
        return false; 
    }

    try { 
        verified = jwt.verify(token, SECRET); 
        if (!verified) { 
            return false;
        }

    } catch (error) { 
        console.log( error )
        return false;
    } 

    return true;
} 

// Returns the ID of a valid token. Null if not valid
const getOwnerOf = (token) => { 
    let id = undefined;
    let token_id = undefined
    let decoded_token = undefined;

    if (!tokenNotNull( token )) {
        return false; 
    }


    try {
        decoded_token = jwt.verify(token, SECRET);
        token_id = decoded_token["data"]["_id"]

        if (!decoded_token) {
            console.log("[!] Could not decode token.")
            return null;
        }

        id = token_id;

    } catch (error) {
        console.log( error )
        return null;
    }

    return id;
} 

// Validate ID belongs to Token
const validateOwnership = (token, id) => {
    let token_id = ""
    let decoded_token = ""

    if (!tokenNotNull( token )) {
        return false; 
    }

    try {
        decoded_token = jwt.verify(token, SECRET);
        token_id = decoded_token["data"]["_id"]

        if (id != token_id) {
            return false;
        }    

    } catch (error) {
        console.log( error )
        return false;
    }

    return true;
}

const isLoggedIn = ( token ) => {
    if ((!token) || (token == null) || (token == undefined)) {
        return false;
    }

    try {
		let valid 	= validateJWT( token );

		if (!valid) {
            return false;
		}

    } catch (e) {
        console.log("[!] Could not verify if user with this token is logged in. Details:")
        console.log("" + token)
        console.log( e )

        return false;
    }

    return true;
} 

export { generateJWT, validateJWT, validateOwnership, getOwnerOf, isLoggedIn };