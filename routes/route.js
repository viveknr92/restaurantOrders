var express = require("express");
var router = express.Router();

const User = require("../models/users");


router.get("/users", (req, res, next) => {
    User.find(function(err, users){
        res.json(users);
    })
});

router.post("/users", (req, res, next) => {
    let newUser = new User({
        user_name: req.body.user_name,
        mail_id: req.body.mail_id,
        password: req.body.password,
        role: req.body.role,
        orders: req.body.orders,
    });
    newUser.save((err, user) =>{
        if(err){
            console.log(err);
            res.json({msg:"Failed to create user"});
        }
        else{
            res.json({msg:"User added sucessfully"});
        }
    });
});


router.get("/users/:id", (req, res, next) => {
    var id = req.params.id;
    User.find(function(err, users){
        res.json(users);
    })
});

module.exports = router;

// router.get("/api/orders", (req, res, next) => {
//     User.find(function(err, users){
//         res.json(users);
//     })
// });

// router.get("/api/items", (req, res, next) => {
//     User.find(function(err, users){
//         res.json(users);
//     })
// });

// router.get("/api/users/:id/cart", (req, res, next) => {
//     User.find(function(err, users){
//         res.json(users.cart);
//     })
// });