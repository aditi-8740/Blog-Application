const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY= process.env.SECRET_KEY;

function createTokenForUser(user) {
    const payload = {
        _id : user._id,
        email : user.email,
        fullname : user.fullname, 
        profileImgURL : user.profileImgURL,
        role : user.role,
    };
    const token = jwt.sign(payload , SECRET_KEY,{
        expiresIn:"3h"
    });
    return token;
}

function validateToken(token) {
    const returnedPayload = jwt.verify(token,SECRET_KEY)    //gives error if not verified??
    return returnedPayload;
}

module.exports= {
    createTokenForUser,
    validateToken
}