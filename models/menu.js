const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
    item_name:{
        type: String,
        required : true
    },
    item_cost:{
        type: Number,
        required: true
    },
    item_type:{
        type: String,
        required: true
    },
    item_image:{
        type: String
    },
    item_availability:{
        type: String,
        required: true
    }

},{
    usePushEach: true
});

module.exports = mongoose.model('menu', MenuSchema,'menu');