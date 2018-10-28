const mongoose = require("mongoose");

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