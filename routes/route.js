var express = require("express");
var router = express.Router();


const User = require("../models/users");
const Menu = require("../models/menu");

router.get("/users", (req, res, next) => {
    User.find(function(err, users){
        res.json(users);
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

router.get("/menu", (req, res, next) => {
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
