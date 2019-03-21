const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    try{
    const token = req.headers.authorization.split(" ")[1];
// Verify the token received from server and attach the secret message along with it
    const decodeToken = jwt.verify(token,"secret_long_token_only_for_developers");
    req.userGeneratedTokenDetails = {
        email: decodeToken.email,
        _id: decodeToken._id,
        fname: decodeToken.fname
    };
    next();
    }
    catch(error) {
        res.status(401).json({
            message: 'Authorization of user fail'
        });
    }
};