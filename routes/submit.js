var express = require('express');
var router = express.Router();

//get index page 
router.get('/', function(req, res, next) {
  console.log("In Submit Page");
  res.render('submit',{fname: req.user.first_name, femail: req.user.email});
});


module.exports = router;