var express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();
const jwt = require("jsonwebtoken");


const User = require("../models/users");
const Menu = require("../models/menu");

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

router.get("/users", (req, res, next) => {
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

router.put('/users/:id', function(req, res){
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

router.post("/users", (req, res, next) => {
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

router.get("/users/:id", (req, res, next) => {
    var id = req.params.id;
    User.findById(id,function(err, users){
        res.json(users);
    })
});

router.delete("/users/:id", (req, res, next) => {
    var id = req.params.id;
    User.remove({
        _id: id
    }, function (err, user) {
        if (err) return res.send(err);
        res.json({ message: 'Deleted' });
    });
});

router.get("/menu",verifyToken, (req, res, next) => {
    Menu.find(function(err, menu){
        res.json(menu);
        //console.log(menu);
    })
});

router.post("/menu", (req, res, next) => {
    let newitem = new Menu({
        item_name: req.body.item_name,
        item_cost: req.body.item_cost
    });
    newitem.save((err, menu) =>{
        if(err){
            console.log(err);
            res.json({msg:"Failed to add menu item"});
        }
        else{
            res.json({msg:"menu item added sucessfully"});
        }
    });
});


router.get("/menu/:id", (req, res, next) => {
    var id = req.params.id;
    Menu.findById(id,function(err, menu){
        res.json(menu);
    })
});

router.put('/menu/:id', function(req, res){
    Menu.update({
        _id: req.params.id
    },
    {
        item_name: req.body.item_name,
        item_cost: req.body.item_cost
    }, function(err, menu){
        if (err) throw err;

        res.json(Menu);
    });
});

router.delete("/menu/:id", (req, res, next) => {
    var id = req.params.id;
    Menu.remove({
        _id: id
    }, function (err, user) {
        if (err) return res.send(err);
        res.json({ message: 'Deleted' });
    });
});
module.exports = router;

