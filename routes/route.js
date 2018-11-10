var express = require("express");
var router = express.Router();

var menu= require("./menu");
var user= require("./user");

router.use("/menu",menu);
router.use("/users", user);

function verifyToken(req, res, next){
    if(req.headers.authorization === undefined){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === undefined || token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

module.exports = router;


