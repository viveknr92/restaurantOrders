const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = mongoose.Schema({
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
],
orderDate :{type: Date, required: true},
orderStatus :{type : String}    

},{
    usePushEach: true
});

module.exports = mongoose.model('order', OrderSchema);