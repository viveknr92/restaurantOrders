const jwtStrategy= require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User= require('../models/users');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrkey=config.secret;
    passport.use();

}