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
        res.json(users);
    })
});

router.post("/login", (req, res, next) => {
    let userdata = req.body;
    User.findOne({user_name:userdata.user_name},(err, users) => {
        if(err){
            console.log(err)
        }else{
            if(!users){
                res.status(401).send('Invalid User')
            }else{

               // res.json(users.password+" "+userdata.password)   
                bcrypt.compare(userdata.password,users.password,(err,result) =>{
                    if(err){console.log(err)}
                    else{
                        let payload = {subject:users._id};
                        let token = jwt.sign(payload, "secretKey");
                        res.status(200).send({token});
                        //res.send(result)
                    }
                });
            }
            // if(users.password !== userdata.password){
            //     res.status(401).send('Invalid Password')
            // }else{
            //     res.send(true);
            // }
        }
    })
});

router.put('/:id',verifyToken, function(req, res){
    User.updateMany({
        _id: req.params.id
    },
    {
        user_name: req.body.user_name,
        mail_id: req.body.mail_id,
        password: req.body.password,
        role: req.body.role
    }, function(err, user){
        if (err) throw err;

        res.json(User);
    });
});

router.post("/register",verifyToken, (req, res, next) => {
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
    // newUser.save((err, user) =>{
    //     if(err){
    //         console.log(err);
    //         res.json({msg:"Failed to create user"});
    //     }
    //     else{
    //         res.json({msg:"User added sucessfully"});
    //     }
    // });
});

router.get("/:id",verifyToken, (req, res, next) => {
    var id = req.params.id;
    User.findById(id,function(err, users){
        res.json(users);
    })
});

router.delete("/:id",verifyToken, (req, res, next) => {
    var id = req.params.id;
    User.remove({
        _id: id
    }, function (err, user) {
        if (err) return res.send(err);
        res.json({ message: 'Deleted' });
    });
});

module.exports = router;