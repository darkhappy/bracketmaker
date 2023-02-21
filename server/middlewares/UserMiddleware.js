const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const isAuth = (req, res, next) => {
    console.log("isauth");
    let token = req.cookies['SESSIONID'] ?? null;
    if(!token){
        return res.status(401).json({message: "Unauthorized u dumbass"})
    }
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) =>{
        if(err){
            console.error(err);
            return res.status(401).json({message: "Unauthorized u they/them"})
        }
        req.payload = payload;
        console.log("the payload is " + JSON.stringify(payload))
        return next();
    });
}

module.exports = { isAuth };

