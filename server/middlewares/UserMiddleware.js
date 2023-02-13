const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const isAuth = (req, res, next) => {
    let token = req.cookies['SESSIONID'] ?? null;
    if(!token){
        console.log("sdfjg");
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) =>{
        if(err){
            console.log("shit");
            console.error(err);
            return res.sendStatus(401);
        }
        req.payload = payload;
        next();
    });
}

module.exports = { isAuth };

