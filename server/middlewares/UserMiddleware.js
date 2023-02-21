const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const isAuth = (req, res, next) => {
    let token = req.cookies['SESSIONID'] ?? null;
    if(!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if(err){
            console.error(err);
            return res.sendStatus(401);
        }
        req.payload = payload;
        next();
    });
}

module.exports = { isAuth };

