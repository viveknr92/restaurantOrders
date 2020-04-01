var express = require("express");
var router = express.Router();

var menu= require("./menu");
var user= require("./user");
var cart= require("./cart");
var order= require("./order");

router.use("/menu",menu);
router.use("/users", user);
router.use("/cart", cart);
router.use("/order", order);

module.exports = router;


