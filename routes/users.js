var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/users');
var LocalStrategy = require('passport-local').Strategy;
var logout = require('./logout');
var login = require('./login');


// Login
router.get('/login', function(req, res){
    
    console.log("get login page");
    login();
    res.render('login', {title:'login', layout:false } );
});

router.post('/login',
    passport.authenticate('local',{successRedirect:'/dashboard' , failureRedirect:'/users/login',failureFlash:true}),
    function(req, res) {
        res.redirect('/dashboard');
    });


// -- LOGOUT --
router.get('/logout', logout);

// =====================================================================================================

function isAuthenticated(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/login');

}

//==============================================================================================================

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else{
        console.log("You are not logged in");
        res.redirect('/users/login');
    }
}

module.exports = router;
