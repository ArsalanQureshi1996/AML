var express = require('express');
var passport = require('passport');
var User = require('../model/users');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();


module.exports = function login (req,res) {
    passport.use('local', new LocalStrategy({

            usernameField: 'email',
            passwordField: 'password',

            passReqToCallback: true // passback entire req to call back
        }, function (req, email, password, done) {


            if (!email || !password) {
                return done(null, false, req.flash('message', 'All fields are required.'));
            }

            User.query("select * from user where email = ?", [email], function (err, rows) {

                

                if (err) return done(req.flash('message', err));

                if (!rows.length) {
                    console.log("Invalid username");
                    return done(null,false, {message: 'Invalid username or password'});
                    
                }



                var dbPassword = rows[0].password;

                if (!(dbPassword == password)) {
                    console.log("Invalid password");
                    return done(null,false, {message: 'Invalid username or password'});
                    

                }

                return done(null, rows[0]);

            });

        }
    ));



    passport.serializeUser(function(user, done){

        done(null, user.id,user.first_name,user.email,user.role);

    });

    passport.deserializeUser(function(id, done){

        User.query("select * from user where id = "+ id, function (err, rows){

            done(err, rows[0]);

        });

    });

};