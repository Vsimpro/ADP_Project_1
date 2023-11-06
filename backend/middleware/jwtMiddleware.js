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
    try { 
        let  verified = jwt.verify(token, SECRET); 
        if (!verified) { 
            return false;
        }

    } catch (error) { 
        console.log( error )
        return false;
    } 

    return true;
} 

export { generateJWT, validateJWT };