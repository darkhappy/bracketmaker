const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const isAuth = (req, res, next) => {
    let token = req.cookies['SESSIONID'] ?? null;
    if(!token){
        return res.status(401).json({message: "Unauthorized u dumbass"})
    }
    console.log(token);
    console.log(process.env.SECRET_KEY)
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) =>{
        if(err){
            console.log("yo")
            return res.status(401).json({message: "Unauthorized u they/them"})
        }
        console.log(req.payload)
        req.payload = payload;
        return next();
    });
}

module.exports = { isAuth };

