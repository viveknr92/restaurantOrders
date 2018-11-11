const express = require("express");
const router = express.Router();
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

router.get("/", (req, res, next) => {
    Menu.find(function(err, menu){
        res.json(menu);
    })
});

router.get("/:item_type/:item_name" , (req,res)=>{
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
        if (err) return res.status(500).send({err});
        res.json({ message: 'Menu item Created', menu_id: menu._id });
    });
});


router.get("/:id", (req, res, next) => {
    Menu.findById(req.params.id,function(err, menu){
        if (err) return res.status(500).send({err});
        if (menu.item_availability === "Y"){
            res.send({success: true, message : "Menu item avaliable"});
        }
        else{
            res.send({success: false, message : "Menu item not avaliable"});
        }      
    })
});

router.put('/:id', function(req, res){
    Menu.findByIdAndUpdate(req.params.id, req.body, function(err, menu){
        if (err) return res.status(500).send({err});
        res.json({ message: 'Menu item Updated', menu : menu });
    });
});

router.delete("/:id", (req, res, next) => {
    Menu.findByIdAndDelete(req.params.id, function (err, menu) {
        if (err) return res.status(500).send({err});
        res.json({ message: 'Menu item Deleted', menu : menu});
    });
});

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })
router.post('/upload/:id', upload.single('item_image'), function (req, res, next) {
    console.log(req.file);
    Menu.findByIdAndUpdate(req.params.id, {$set : {item_image : req.file.filename}}, function(err, menu){
        if (err) return res.status(500).send({err});
        res.json({ message: 'Menu item Updated with image path', menu : menu });
    });
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})

router.get ('/upload/:name',(req,res)=>{
    console.log("get image");
    //var dir = path.join(__dirname, 'public/uploads/'+req.params.name)
    console.log("here for image " + dir);
    //res.sendFile(dir);
})


module.exports = router;