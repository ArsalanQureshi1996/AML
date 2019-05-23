var express = require('express');
var User = require('../model/users');
var passport = require('passport');
var router = express.Router();



 //get dashboard page
router.get('/', function(req, res, next) {
  console.log("In-dashboard");
  console.log(req.user.role);


  var roles = {
    admin: false,
    user: false
  }

  if(req.user.role == "admin")
    roles.admin = true;
  if(req.user.role == "user")
    roles.user = true;

    console.log(roles)
  res.render('dashboard',{fname: req.user.first_name, femail: req.user.email, frole: roles});
});

module.exports = router;