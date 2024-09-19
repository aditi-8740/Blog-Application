const {createTokenForUser,
    validateToken
} = require('../services/authentication')

function checkForAuthenticationCookie(req,res,next) {
    const tokenCookie = req.cookies?.token;
    res.user = null;

    if (!tokenCookie ) return next();
    

    const token = tokenCookie;
    const user = validateToken(token);

    req.user = user;
    return next();

}

module.exports = {
    checkForAuthenticationCookie,
}