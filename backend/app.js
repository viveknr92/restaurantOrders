var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const passport = require("passport");
var morgan  = require('morgan')
 
const route = require("./routes/route");

app.use(morgan('combined'))
var cors = require('cors');
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
    next();
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use('/api', route);
var mongoose = require("mongoose");

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
    
mongoose.connect('mongodb+srv://vivek:1992@cluster0-gvsxo.mongodb.net/Restaurant', { useNewUrlParser: true });

mongoose.connection.on('connected', ()=>{
    console.log("Connected to db");
});

mongoose.connection.on('error', (err) =>{
    if (err){
        console.log("Error in db  : " + err);
    }
});


app.listen(3000, "0.0.0.0", function(){
    console.log("Server started at 3000");
});