import jwt from "jsonwebtoken";

//TODO: Switch to process.env
const SECRET = 'secret'

const generateJWT = (id) => { 
    var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
            _id : id
        }
    }, 
    SECRET);

    return token;
}

const validateJWT = (token) => { 
    let verified = false;
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

const validateOwnership = (token, id) => {
    let token_id = ""
    let decoded_token = ""
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

export { generateJWT, validateJWT, validateOwnership };