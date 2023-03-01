const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const isAuth = (req, res, next) => {
    let token = req.cookies['SESSIONID'] ?? null;
    if(!token){
        return res.status(401).json({message: "Unauthorized u dumbass"})
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if(err){
            return res.status(401).json({message: "Unauthorized u they/them"})
        }
        req.payload = payload;

        return next();
    });
}

module.exports = { isAuth };

