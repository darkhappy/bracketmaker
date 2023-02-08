const jwt = require('jsonwebtoken');

const isAuth = (res, req, next) => {
    let token = req.cookies['SESSIONID'] ?? null;
    if(!token){
        return res.sendStatus(401);
    }

    jwt.verify(token, "cle-tres-secrete", (err, payload) =>{
        if(err){
            return res.sendStatus(401);
        }
        req.payload = payload;
        next();
    });
}

module.exports = { isAuth };

