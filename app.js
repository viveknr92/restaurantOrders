var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const passport = require("passport");
 
const route = require("./routes/route");

var cors = require('cors');
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use('/api', route);
var mongoose = require("mongoose");

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
    
mongoose.connect('mongodb://localhost:27017/Restaurant', { useNewUrlParser: true });

mongoose.connection.on('connected', ()=>{
    console.log("Connected to db");
});

mongoose.connection.on('error', (err) =>{
    if (err){
        console.log("Error in db  : " + err);
    }
});


app.listen(3000, "localhost", function(){
    console.log("Server started at 3000");
});