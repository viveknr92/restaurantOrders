const express = require("express");
const router = express.Router();
var Menu = require("../models/menu");

// router.get("/menu",verifyToken, (req, res, next) => {
//     Menu.find(function(err, menu){
//         res.json(menu);
//         //console.log(menu);
//     })
// });

router.get("/",(req,res)=>{
    res.send("in MENU");
})


router.get("/:item_type/:item_name",(req,res)=>{
    var q;
    console.log(req.params.item_type + " " + req.params.item_name)
    var item= {
        item_type: req.params.item_type.toLowerCase(),
        item_name: req.params.item_name.toLowerCase()
    }
    
    if(item.item_name === "all" && item.item_type === "all"){
        console.log(item.item_type + " " + item.item_name)
        Menu.find((err,menu)=>{
            console.log(menu+err);
            res.json(menu);
        })
    }else if(item.item_name!== "all" && item.item_type === "all"){
        console.log(item.item_type + " " + item.item_name)
        Menu.find({item_name: item.item_name.toLowerCase()},(err,menu)=>{
            res.json(menu);
        });
    }else if(item.item_name === "all" && item.item_type !== "all"){
        console.log(item.item_type + " " + item.item_name)
        Menu.find({item_type: item.item_type.toLowerCase()},(err,menu)=>{
            res.json(menu);
        });
    }else{
        console.log(item.item_type + " " + item.item_name)
        Menu.find({item_type: item.item_type.toLowerCase(),item_name: item.item_name.toLowerCase()},(err,menu)=>{
            res.json(menu);
        });

    }    
   // res.send("in MENU");
});
router.post("/", (req, res, next) => {
    let newitem = new Menu({
        item_name: req.body.item_name,
        item_cost: req.body.item_cost,
        item_type: req.body.item_type,
        item_availability: req.body.item_availability
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


// router.get("/menu/:id", (req, res, next) => {
//     var id = req.params.id;
//     Menu.findById(id,function(err, menu){
//         res.json(menu);
//     })
// });

// router.put('/menu/:id', function(req, res){
//     Menu.update({
//         _id: req.params.id
//     },
//     {
//         item_name: req.body.item_name,
//         item_cost: req.body.item_cost
//     }, function(err, menu){
//         if (err) throw err;

//         res.json(Menu);
//     });
// });

// router.delete("/menu/:id", (req, res, next) => {
//     var id = req.params.id;
//     Menu.remove({
//         _id: id
//     }, function (err, user) {
//         if (err) return res.send(err);
//         res.json({ message: 'Deleted' });
//     });
// });
module.exports = router;