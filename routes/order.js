const express = require("express");
const router = express.Router();
var Order = require("../models/order");
var Cart = require("../models/cart");
var User = require("../models/users");
var Menu = require("../models/menu");
const jwt = require("jsonwebtoken");

router.use(function (req, res, next) {
    if (req.headers.authorization === undefined) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === undefined || token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
});

router.get("/", function (req, res, next) {
    res.json("Orders API");
});

router.get("/:user_id", (req, res, next) => {
    var order_array = [];
    var id = req.params.user_id;
    User.findById(id, function (err, user) {
        if (err) return res.status(500).send({ err });
        if (user.orders.length == 0 || user.orders === undefined){
            return res.status(400).send({ success : false, msg: "No orders placed" });
        }
        user.orders.forEach((ord, idx, orders) => {
            //console.log(ord + " " + idx);
            // Cart.findById(user.cart).populate("foods.menu").exec((err, carts) => {
			// 	res.json(carts);
			// });
            //Order.findById(ord, function (err, order_details) {
            Order.findById(ord).populate("foods.menu").exec((err, order_details)=> {   
                if (err) return res.status(500).send({ err });
                //console.log(order_details);
                order_array.push(order_details);
                if (order_array.length === user.orders.length){
                    console.log(order_array);
                    res.json(order_array);
                }
            })
        });
    })
});

router.post("/:user_id", (req, res, next) => {
    User.findById(req.params.user_id, function (err, user) {
        if (err) return res.status(500).send({ success : false, msg: "User not found - " + err});
        if (user === null){
            return res.status(400).send({ success : false, msg: "User not found" });
        }
        cart_id = user.cart;
        Cart.findById(cart_id, function (err, cart) {
            if (err) return res.status(500).send({ err });
            if (!cart) return res.status(400).send({ success: false, err: "Cannot place order with an empty cart" });
            var newOrder = new Order({
                mail_id: user.mail_id,
                total_cost: cart.total_cost,
                foods: cart.foods,
                orderDate: new Date(),
                orderStatus: "order received"
            })

            console.log(newOrder);
            newOrder.save(function (err, order) {
                if (err) return res.status(500).send({ err });
                console.log("------------------------------------");
                console.log(order);
                User.findByIdAndUpdate(req.params.user_id, { $push: { orders: order._id }, $set: { cart: null } }, { new: true }, (err, updatedUser) => {
                    if (err) return res.status(500).send({ err });
                    console.log(updatedUser);

                    Cart.findByIdAndDelete(cart_id, (err, deletedCart) => {
                        if (err) return res.status(500).send({ err });
                        console.log(deletedCart);
                        res.status(200).send({ success: true, message: "New Order Placed" });
                    })
                })
            })
        })
    })
})


module.exports = router;