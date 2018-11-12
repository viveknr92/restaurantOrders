const express = require("express");
const router = express.Router();
var Cart = require("../models/cart");
var User = require("../models/users");
var Menu = require("../models/menu");
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
    res.json("Cart API");
})

router.get("/:user_id", (req, res, next) => {
    var id = req.params.user_id;
    User.findById(id,function(err, user){
        if(user.cart !== undefined || user.cart !== null){
            // Cart.findById(user.cart, function(err, cart){
            //     res.json(cart);
			// })
			Cart.findById(user.cart).populate("foods.menu").exec((err, carts)=>{
                res.json(carts);
            });
        }
    })
});

router.delete("/:user_id/:fid", (req, res, next) => {
    var id = req.params.user_id;
	var fid = req.params.fid;
	var isValidfid = false;	
    User.findById(id,function(err, user){
        if(user.cart !== undefined || user.cart !== null){
            Cart.findById(user.cart, function(err, cart){
                cart.foods.forEach((food, idx, foods)=>{
                    console.log(food.menu + " " + fid);
                    if(food.menu == fid){
						foods.splice(idx,1); 
						isValidfid = true;
                    }        
				});
				if (isValidfid === false){
					return res.json({ success: false, message: 'Item not found in cart'});
				}
                Cart.findOneAndUpdate(user.cart,{ $set : {foods : cart.foods}},(err,resp)=>{
                    if (err){
                        res.json({ success: false, message: 'Could not delete from cart '  + err });
                    }else{
						console.log(resp);
                        res.json({ success: true, message: 'Deleted successfully from cart' });
                    }
                });
            })
        }
    })
});


router.post("/:uid/:fid", (req, res, next) => {
    User.findById(req.params.uid,(err,user)=>{
		console.log(user+err);
		var fid = req.params.fid;
				console.log(fid);

		Menu.findById(req.params.fid,(err,food)=>{
            console.log("user.cart " + user.cart);
            console.log(user);
			if (user.cart == undefined || user.cart == null){
				let newCart = new Cart({
					mail_id: user.mail_id.toLowerCase(),
					total_cost: food.item_cost,
					foods :[{menu:fid, quantity: 1}]
				});

				newCart.save((err,resp)=>{
					if (err){
						console.log("something went wrong" + err);
						res.json({ success: false, message: 'Could not add to cart ' + err });
					}
					var cid = resp._id;	
					User.findByIdAndUpdate(req.params.uid,{ $set: { cart : cid }}, { new: true },(err,resp)=>{
						if (err){
							console.log("something went wrong");
							res.json({ success: false, message: 'Could not add to cart'  + err });
						}else{
							res.json({ success: true, message: 'Added successfully to cart' });
						}
					});									
				});
			}else{
				var cartid = user.cart;
				var flag = true;
				console.log(cartid);
				Cart.findById(cartid,(err,cart)=>{
					console.log(cart);
					cart.total_cost = cart.total_cost + food.item_cost ;
					//cart.total_cost = precisionRound(cart.total_cost,2);
					console.log(cart.total_cost);
					cart.foods.forEach((food, idx,foods)=>{
						console.log(idx);
						if(food.menu == fid){
							flag = false;
							console.log("incrementing");
                            
                            food.quantity = food.quantity +1;
                            console.log(cart);
							cart.save((err,resp)=>{
								if (err){
									console.log("something went wrong");
								    res.json({ success: false, message: 'Could not add to cart'  + err});

								}else{
									res.json({ success: true, message: 'Added successfully to cart' });
								}						
							});							
						}else
						if(idx == foods.length-1 && flag == true){
							console.log("pushing");
							cart.foods.push({menu: fid,quantity : 1});
							cart.save((err,resp)=>{
								if (err){
									console.log("something went wrong");
								    res.json({ success: false, message: 'Could not add to cart'  + err});

								}else{
									res.json({ success: true, message: 'Added successfully to cart' });
								}						
							})							
						}
					})

				})

			}
		});
	});		
})


module.exports = router;