var express = require('express');
var User = require('../model/users');
var passport = require('passport');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;


//get add tender page
router.get('/', function(req, res, next) {
  console.log("In-addTender");

    var roles = {
    admin: false,
    user: false
    }

  if(req.user.role == "admin")
    roles.admin = true;
  if(req.user.role == "user")
    roles.user = true;

    res.render('addTender',{fname: req.user.first_name, femail: req.user.email, frole: roles});

});

//post request add tenders to database
router.post('/', function(req,res){


  var Cust_name = req.body.Cust_name;
  var Cust_number = req.body.Cust_number;
  var ntn_number = req.body.ntn_number;
  var stn_number = req.body.stn_number;
  var salary_monthly = req.body.salary_monthly;
  var Savings = req.body.Savings;
  var salary_per_anum = req.body.salary_per_anum;
  var Bank_name = req.body.Bank_name;
  var Bank_acc_number = req.body.Bank_acc_number;
  var Job_type = req.body.Job_type;
  var Industry = req.body.Industry;
  var Opening_date = req.body.Opening_date;
  var Currency = req.body.Currency;
  var politically_exposed_person = req.body.politically_exposed_person;
 
  req.checkBody('Cust_name','Customer name is required').notEmpty();
  req.checkBody('Cust_number','Customer Number is required').notEmpty();
  req.checkBody('ntn_number','NTN NUMBER is required').notEmpty();
  req.checkBody('stn_number','STN NUMBER is required').notEmpty();
  req.checkBody('salary_monthly','Monthly Salary is required').notEmpty();
  req.checkBody('Savings','Savings is required').notEmpty();
  //req.checkBody('salary_per_anum','Salary per anum is required').notEmpty();
  req.checkBody('Bank_name','Bank Name is required').notEmpty();
  req.checkBody('Bank_acc_number','Bank account number is required').notEmpty();
  req.checkBody('Job_type','Job Type is required').notEmpty();
  req.checkBody('Industry','Industry is required').notEmpty();
  req.checkBody('Currency','Currency is required').notEmpty();
  req.checkBody('Opening_date','Opening date is required').notEmpty();
  req.checkBody('politically_exposed_person','PEP is required').notEmpty();
  

  
  var error = req.validationErrors();
    if(error){
        req.flash('error_msg','Something is incorrect');
        console.log(error);
    }
    else {

        var sql = 'INSERT INTO tenders (Cust_name, Cust_number,ntn_number,stn_number, salary_monthly, Savings, salary_per_anum, Bank_name, Bank_acc_number, Job_type, Industry, Currency, Opening_date, politically_exposed_person) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        User.query(sql ,[ Cust_name, Cust_number,ntn_number,stn_number, salary_monthly, Savings ,salary_per_anum= salary_monthly*12, Bank_name, Bank_acc_number, Job_type, Industry, Currency, Opening_date, politically_exposed_person], function (error, results, fields){
            if(error) throw error;         
        });
                  req.flash('success_msg', 'Your reponse have been submitted');
                  res.redirect('/submit');
        }
  
});
module.exports = router;