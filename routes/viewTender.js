var express = require('express');
var User = require('../model/users');
var passport = require('passport');
var router = express.Router();


//get view tender page with results;
router.get('/', function (req,res)  {
console.log("In-viewTender");
    
    var roles = {
    admin: false,
    user: false
  }

  console.log(roles)

  if(req.user.role == "admin")
    roles.admin = true;
  if(req.user.role == "user")
    roles.user = true;
    
    var sql = "SELECT * FROM tenders";
    User.query(sql, function (err, results) {
        if (err) {
            throw err;
        }
        console.log(results);
         res.render('viewTender',{ fname: req.user.first_name , femail: req.user.email ,layout:false, data:results, total:results.length, frole: roles});
            });
           
});


module.exports = router;