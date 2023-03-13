const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const isAuth = (req, res, next) => {
    let token = req.cookies['SESSIONID'] ?? null;
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if(err){
            console.error(err);
            return res.status(401).json({message: "Unauthorized"})
        }
        req.payload = payload;

        return next();
    });
}

module.exports = { isAuth };

