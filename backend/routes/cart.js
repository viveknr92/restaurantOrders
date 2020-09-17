const express = require("express");
const router = express.Router();
var Cart = require("../models/cart");
var User = require("../models/users");
var Menu = require("../models/menu");
const jwt = require("jsonwebtoken");

router.use(function (req, res, next) {
	if (req.headers.authorization === undefined) {
		return res.status(401).send('Unauthorized request')
	}
	// let token = req.headers.authorization.split(" ")[1];
	let token = req.cookies.Authtoken
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
	res.json("Cart API");
})

router.get("/:user_id", (req, res, next) => {
	var id = req.params.user_id;
	User.findById(id, function (err, user) {
		if (user === null) {
			return res.status(400).send({ msg: "user not found" });
		}
		if (user.cart !== undefined || user.cart !== null) {
			Cart.findById(user.cart).populate("foods.menu").exec((err, carts) => {
				res.json(carts);
			});
		}
	})
});

router.get("/:user_id/:fid", (req, res, next) => {
	var isValidfid = false;
	var fid = req.params.fid;
	var index = 0;
	//var quantity= 0;
	User.findById(req.params.user_id, function (err, user) {
		if (err) return res.status(500).send({ err });
		if (user === null) {
			return res.status(400).send({ success: false, msg: "user not found" });
		}
		if (user.cart !== undefined || user.cart !== null) {
			Cart.findById(user.cart, (err, cart) => {
				if (err) return res.status(500).send({ err });
				if (cart === null || cart === undefined) {
					return res.status(400).send({ success: false, msg: "cart not found" });
				}
				if (cart.foods === undefined || cart.foods.length == 0) {
					return res.status(400).send({ success: false, msg: "Cart Empty" });
				}
				for (food of cart.foods) {
					//console.log(cart.foods.indexOf(food));
					if (food.menu == fid) {
						console.log("food.menu == fid");
						isValidfid = true;
						Menu.findById(req.params.fid, (err, menu) => {
							if (err) return res.status(500).send({ err });
							return res.send({
								mail_id: cart.mail_id,
								total_cost: cart.total_cost,
								foods: menu,
								quantity: food.quantity
							})
						})
					}
				}
				if (isValidfid === false) {
					return res.status(400).send({ success: false, msg: "Invalid food id; Item not found" });
				}
			});
		}
	})
});

router.put("/:user_id/:fid", (req, res, next) => {
	var id = req.params.user_id;
	var fid = req.params.fid;
	var isValidfid = false;
	//console.log(id);
	//console.log(req.body);
	User.findById(id, function (err, user) {
		if (err) return res.status(500).send({ err });
		if (user === null) {
			return res.status(400).send({ msg: "user not found" });
		}
		//console.log(user.cart);
		if (user.cart !== undefined || user.cart !== null) {
			Cart.findById(user.cart, function (err, cart) {
				if (err) return res.status(500).send({ err });
			//	console.log(cart.foods);
				if (cart.foods === undefined || cart.foods.length == 0) {
					return res.status(400).send({ msg: "Cart Empty" });
				}
				cart.foods.forEach((food, idx, foods) => {
					if (food.menu == fid) {
						isValidfid = true;
						if (req.body.quantity === 0) {
							//console.log(food.quantity);
							//console.log(cart.total_cost);
							Menu.findById(fid, (err, menu) => {
								if (err) return res.status(500).send({ err });

								cart.total_cost = cart.total_cost - (food.quantity * menu.item_cost)
								cart.foods.splice(idx, 1);
								//console.log("req.body.quantity === 0");
								//console.log(cart.foods);
							//console.log(user.cart);
								Cart.findByIdAndUpdate(user.cart, {
									$set: {
										foods: cart.foods, total_cost: cart.total_cost
									}
								}, (err, resp) => {
									if (err) return res.status(500).send({ err });
								//	console.log(resp);
									res.json({ success: true, message: 'Deleted successfully from cart' });
								});
							})

						}
						else {
							console.log("food.quantity = req.body.quantity "+req.body.quantity);

							Menu.findById(fid, (err, menu) => {
								if (err) return res.status(500).send({ err });
								
								
								cart.total_cost = cart.total_cost + ((req.body.quantity - food.quantity) * menu.item_cost)
								//var idx = cart.foods.indexOf(food);
								console.log("index --------------------" + idx+"------"+food);
								cart.foods[idx].quantity = req.body.quantity;
								console.log(cart.foods);
								console.log(cart.total_cost);
								//food.quantity = req.body.quantity;
								Cart.findByIdAndUpdate(user.cart, {
									$set: {
										foods: cart.foods, total_cost: cart.total_cost
									}
								}, (err, resp) => {
									if (err) return res.status(500).send({ err });
									console.log("RESP+++++++++"+resp);
									res.json({ success: true, message: 'Updated successfully from cart' });
								});
							})
						}
					}
				});
				if (isValidfid === false) {
					return res.status(400).send({ success: false, message: 'Item not found in cart' });
				}
			})
		}
	})
});


router.post("/:uid/:fid", (req, res, next) => {
	User.findById(req.params.uid, (err, user) => {
		if (err) return res.status(500).send({ err });
		if (user === null) {
			return res.status(400).send({ msg: "user not found" });
		}
		console.log(user + err);
		var fid = req.params.fid;
		console.log(fid);

		Menu.findById(req.params.fid, (err, food) => {
			if (err) return res.status(500).send({ err });
			//console.log("user.cart " + user.cart);
			console.log(user);
			if (user.cart === undefined || user.cart === null) {
				let newCart = new Cart({
					mail_id: user.mail_id.toLowerCase(),
					total_cost: food.item_cost,
					foods: [{ menu: fid, quantity: 1 }]
				});
				newCart.save((err, resp) => {
					if (err) {
						console.log("something went wrong" + err);
						res.json({ success: false, message: 'Could not add to cart ' + err });
					}
					var cid = resp._id;
					User.findByIdAndUpdate(req.params.uid, { $set: { cart: cid } }, { new: true }, (err, resp) => {
						if (err) {
							console.log("something went wrong");
							res.json({ success: false, message: 'Could not add to cart' + err });
						} else {
							res.json({ success: true, message: 'Added successfully to cart' });
						}
					});
				});
			} else {
				console.log("-------------------------else");
				var cartid = user.cart;
				var flag = true;
				console.log(cartid);
				Cart.findById(cartid, (err, cart) => {
					console.log(cart);
					cart.total_cost = cart.total_cost + food.item_cost;
					//cart.total_cost = precisionRound(cart.total_cost,2);
					console.log(cart.total_cost);
					if (cart.foods === undefined || cart.foods.length == 0) {
						console.log("foods empty - pushing");
						cart.foods.push({ menu: fid, quantity: 1 });
						cart.save((err, resp) => {
							if (err) {
								console.log("something went wrong");
								res.json({ success: false, message: 'Could not add to cart' + err });

							} else {
								res.json({ success: true, message: 'Added successfully to cart' });
							}
						})
					} else {
						cart.foods.forEach((food, idx, foods) => {
							console.log(idx);
							if (food.menu == fid) {
								flag = false;
								console.log("incrementing");

								food.quantity = food.quantity + 1;
								console.log(cart);
								cart.save((err, resp) => {
									if (err) {
										console.log("something went wrong");
										res.json({ success: false, message: 'Could not add to cart' + err });

									} else {
										res.json({ success: true, message: 'Added successfully to cart' });
									}
								});
							} else
								if (idx === foods.length - 1 && flag === true) {
									console.log("pushing");
									cart.foods.push({ menu: fid, quantity: 1 });
									cart.save((err, resp) => {
										if (err) {
											console.log("something went wrong");
											res.json({ success: false, message: 'Could not add to cart' + err });

										} else {
											res.json({ success: true, message: 'Added successfully to cart' });
										}
									})
								}
						})
					}
				})

			}
		});
	});
})


module.exports = router;