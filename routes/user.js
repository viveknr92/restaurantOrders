const express = require("express");
const router = express.Router();
var User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

router.get("/",verifyToken, (req, res, next) => {
    User.find(function(err, users){
        if (err) return res.status(500).send({err});
        res.json(users);
    })
});

router.post("/login", (req, res, next) => {
    let userdata = req.body;
    User.findOne({user_name:userdata.user_name},(err, users) => {
        if(err){
            console.log(err);
            res.status(500).send({err});
        }
        else{
            if(!users){
                res.status(401).send({success : false, message : "Invalid Username"});
            }
            else{ 
                bcrypt.compare(userdata.password,users.password,(err,result) =>{
                    if (err){
                        res.status(500).send({err});
                    }
                    console.log("result : " + result);
                    if(result){
                        let payload = {subject:users._id};
                        let token = jwt.sign(payload, "secretKey");
                        res.status(200).send({success : true, token : token, user_id : users._id});
                    }
                    else{
                        res.status(401).send({success : false, message : "Invalid password"});
                    }
                });
            }
        }
    })
});

router.put('/:id',verifyToken, function(req, res){
    updatedUser = req.body;
    if (updatedUser.password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(updatedUser.password, salt, (err, hash) => {
                if (err) return res.status(500).send({err});
                updatedUser.password = hash;
                User.findByIdAndUpdate(req.params.id, updatedUser, function(err, user){
                    if (err) return res.status(500).send(err);
                    res.status(200).send({success : true, message : "User updated with password"});
                });
            })
        })
    }
    else{
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            if (err) return res.status(500).send({err});
            res.status(200).send({success : true, message : "User updated"});
        });
    }
});

router.post("/register", (req, res, next) => {
    let newUser = new User({
        user_name: req.body.user_name,
        mail_id: req.body.mail_id,
        password: req.body.password,
        role: req.body.role,
        orders: req.body.orders,
        cart:req.body.cart
    });

    User.addUser(newUser,(err,user) =>{
        if(err){
            res.json({success: false,msg:'Failed to register user'});
        }else{
            let payload = {subject:user._id};
            let token = jwt.sign(payload, "secretKey");
            res.status(200).send({token});
        }
    });
});

router.get("/:id",verifyToken, (req, res, next) => {
    var id = req.params.id;
    User.findById(id,function(err, users){
        if (err) return res.status(500).send({err});
        res.json(users);
    })
});

router.delete("/:id",verifyToken, (req, res, next) => {
    var id = req.params.id;
    User.remove({
        _id: id
    }, function (err, user) {
        if (err) return res.status(500).send({err});
        res.json({ message: 'Deleted' });
    });
});

module.exports = router;