const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const isAuth = (req, res, next) => {
    let token = req.cookies['SESSIONID'] ?? null;
    if(!token){
        return res.status(401).json({message: "Unauthorized u dumbass"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if(err){
            console.error(err);
            res.clearCookie('SESSIONID')
            res.clearCookie('sessioninfo')
            return res.redirect('/user/logout');
        }
        console.log(req.payload)
        req.payload = payload;

        return next();
    });
}

module.exports = { isAuth };

