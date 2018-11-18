const express = require("express");
const router = express.Router();
var Menu = require("../models/menu");
const jwt = require("jsonwebtoken");
var multer = require('multer');
const path = require("path");

// router.use(function (req, res, next) {
//     if (req.headers.authorization === undefined) {
//         return res.status(401).send('Unauthorized request')
//     }
//     let token = req.headers.authorization.split(" ")[1];
//     if (token === undefined || token === 'null') {
//         return res.status(401).send('Unauthorized request')
//     }
//     let payload = jwt.verify(token, 'secretKey');
//     if (!payload) {
//         return res.status(401).send('Unauthorized request')
//     }
//     req.userId = payload.subject
//     next()
// });

router.get('/image/:name', (req, res) => {
    var dir = path.join(__dirname, '../public/uploads/' + req.params.name)
    console.log(dir);
    res.setHeader("Content-Type", "image/jpeg");
    res.sendFile(dir);
})

var upload = multer({ dest: 'public/uploads/' })
router.post('/image/:menu_id', upload.single('item_image'), function (req, res, next) {
    console.log(req.file);
    Menu.findByIdAndUpdate(req.params.menu_id, { $set: { item_image: req.file.
        filename } }, function (err, menu) {
        if (err) return res.status(500).send({ err });
        res.json({ message: 'Menu item Updated with image path', menu: menu });
    });
})

router.get("/", (req, res, next) => {
    Menu.find(function (err, menu) {
        if (err) return res.status(500).send({ err });
        res.json(menu);
    })
});

router.get("/:item_type/:item_name", (req, res) => {
    var q;
    console.log(req.params.item_type + " " + req.params.item_name)
    var item = {
        item_type: req.params.item_type.toLowerCase(),
        item_name: req.params.item_name.toLowerCase()
    }

    if (item.item_name === "all" && item.item_type === "all") {
        console.log(item.item_type + " " + item.item_name)
        Menu.find((err, menu) => {
            if (err) return res.status(500).send({ err });
            //console.log(menu+err);
            res.json(menu);
        })
    } else if (item.item_name !== "all" && item.item_type === "all") {
        console.log(item.item_type + " " + item.item_name)
        Menu.find({ item_name: item.item_name.toLowerCase() }, (err, menu) => {
            if (err) return res.status(500).send({ err });
            res.json(menu);
        });
    } else if (item.item_name === "all" && item.item_type !== "all") {
        console.log(item.item_type + " " + item.item_name)
        Menu.find({ item_type: item.item_type.toLowerCase() }, (err, menu) => {
            if (err) return res.status(500).send({ err });
            res.json(menu);
        });
    } else {
        console.log(item.item_type + " " + item.item_name)
        Menu.find({ item_type: item.item_type.toLowerCase(), item_name: item.item_name.toLowerCase() }, (err, menu) => {
            if (err) return res.status(500).send({ err });
            res.json(menu);
        });

    }
    // res.send("in MENU");
});
router.post("/", (req, res, next) => {
    let newitem = new Menu({
        item_name: req.body.item_name.toLowerCase(),
        item_cost: req.body.item_cost,
        item_type: req.body.item_type.toLowerCase(),
        item_availability: req.body.item_availability
    });
    newitem.save((err, menu) => {
        if (err) return res.status(500).send({ err });
        res.json({ message: 'Menu item Created', menu_id: menu._id });
    });
});


router.get("/:id", (req, res, next) => {
    Menu.findById(req.params.id, function (err, menu) {
        if (err) return res.status(500).send({ err });
        
            res.send({ success: true,menu: menu,message: "Menu item avaliable" });
    })
});

router.put('/:id', function (req, res) {
    console.log(req.body);
    let updateditem = {
        item_name: req.body.item_name.toLowerCase(),
        item_cost: req.body.item_cost,
        item_type: req.body.item_type.toLowerCase(),
        item_availability: req.body.item_availability
    };
    Menu.findByIdAndUpdate(req.params.id, updateditem, function (err, menu) {
        if (err) return res.status(500).send({ err });
        res.json({ message: 'Menu item Updated', menu: menu });
    });
});

router.delete("/:id", (req, res, next) => {
    Menu.findByIdAndUpdate(req.params.id, {
        $set: {
            item_availability: 'N'
        }
    }, function (err, menu) {
        if (err) return res.status(500).send({ err });


        // Menu.findByIdAndDelete(req.params.id, function (err, menu) {
        //     if (err) return res.status(500).send({err});
        res.json({ message: 'Menu item Deleted', menu: menu });
    });
});


module.exports = router;