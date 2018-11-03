const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
    item_name:{
        type: String,
        required : true
    },
    item_cost:{
        type: Number,
        required: true
    }
});

const Menu = module.exports = mongoose.model('menu', MenuSchema,'menu');