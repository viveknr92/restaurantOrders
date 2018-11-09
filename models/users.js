const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    user_name:{
        type: String,
        required : true
    },
    mail_id:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    role:{
        type: String,
        required: true
    },
    orders:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "order"  
        }
    ],
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    }
},{
    usePushEach: true
});

const User = module.exports = mongoose.model('User', UserSchema,'users');

module.exports.addUser = function(newUser, callback){
    if(newUser){
    bcrypt.genSalt(10,(err , salt) => {
        bcrypt.hash(newUser.password,salt,(err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
 }
}
