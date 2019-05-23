var express = require('express');
var router = express.Router();
var User = require('../model/users');

//get register page.
router.get('/', function(req, res) {
  console.log("In registration Page");
   res.render('register', { layout:false } );
});

//post request registerUser to the database
router.post('/', function(req,res){
 
  var firstname = req.body.firstname;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  var role = req.body.role;

  console.log(role);
 
  req.checkBody('firstname','first name is required').notEmpty();
  req.checkBody('email','Email is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('password','Password is required').notEmpty();
  req.checkBody('password2','Password do not match').equals(req.body.password);
  req.checkBody('role', 'role is required').notEmpty();

  var error = req.validationErrors();
    if(error){
        req.flash('error_msg','Something is incorrect');
        console.log(error);
    }
    else {
        var sql = 'INSERT INTO user (first_name, email, password, role) VALUES (?, ?, ?, ?)';
        User.query(sql ,[firstname , email, password, role], function (error, results, fields){
            if(error) throw error;         
        });

            req.flash('success_msg', 'You are registered and now can login');
            res.redirect('/dashboard');
    } 
});
module.exports = router;
