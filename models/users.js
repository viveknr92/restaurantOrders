const mongoose = require("mongoose");
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
     
    ],
    cart:[
    
    ]
});

const User = module.exports = mongoose.model('User', UserSchema,'users');

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10,(err , salt) => {
        bcrypt.hash(newUser.password,salt,(err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}