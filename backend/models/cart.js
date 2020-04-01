const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = mongoose.Schema({
mail_id:{ type: String, required: true, lowercase: true},
total_cost:{ type: Number},
foods : [
{
    menu:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu"
    },
    quantity : { type : Number, default: 0}
}
]
},{
    usePushEach: true
});

module.exports = mongoose.model('cart', CartSchema);