const express = require("express");
const router = express.Router();
var Order = require("../models/order");
const jwt = require("jsonwebtoken");

router.use(function (req, res, next){
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
});

router.get("/", function(req, res, next){
    res.json("Orders API");
});



module.exports = router;