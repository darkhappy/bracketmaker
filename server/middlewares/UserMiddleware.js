const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const isAuth = (res, req, next) => {
    let token = req.cookies['SESSIONID'] ?? null;
    if(!token){
        return res.sendStatus(401);
    }

    const result = dotenv.config()
    if (result.error) {
        return res.sendStatus(401)
    }
    let key = result.parsed.SECRET_KEY

    jwt.verify(token, key, (err, payload) =>{
        if(err){
            return res.sendStatus(401);
        }
        req.payload = payload;
        next();
    });
}

module.exports = { isAuth };

