var express = require('express');
var router = express.Router();

//get index page 
router.get('/', function(req, res, next) {
  console.log("In Login Page");
  res.redirect('user/login');
});


module.exports = router;