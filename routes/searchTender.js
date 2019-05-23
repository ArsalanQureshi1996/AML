var express = require('express');
var User = require('../model/users');
var passport = require('passport');
var router = express.Router();


//get search Tender page with results from database
router.get('/', function (req,res)  {
    console.log("In-searchTender");

    var roles = {
    admin: false,
    user: false
    }

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
         res.render('searchTender',{fname: req.user.first_name, femail: req.user.email, layout:false, data:results, frole: roles});
        });
});


//post request search tenders function
router.post('/',function (req,res)  {
    console.log("Post-function searchTender");
    var ntn_number = req.body.ntn_number;
    var Cust_name = req.body.Cust_name;
    var Cust_number = req.body.Cust_number;
    var stn_number = req.body.stn_number;
    var remainQuery = "";
    var numOfParamsNtNull = 0;


    if(ntn_number !== ""){
        console.log("Inside date");
        remainQuery += "ntn_number = " + "'" + ntn_number + "'"  ; 
        numOfParamsNtNull++;
    }
    else if(Cust_name !== ""){
                console.log("Inside institution");
        if(numOfParamsNtNull > 0){
            remainQuery +=  " OR ";
        }
        remainQuery += "Cust_name = " + "'" + Cust_name + "'";
        numOfParamsNtNull++;
    }
    else if(Cust_number !== "") {
        if(numOfParamsNtNull > 0){
            remainQuery +=  " OR ";
        }
        remainQuery += "Cust_number = " + "'" + Cust_number + "'" ;
        numOfParamsNtNull++;
    }
    else if(stn_number !== "") {
        if(numOfParamsNtNull > 0){
            remainQuery +=  " OR ";
        }
        remainQuery += "stn_number = " + "'" + stn_number + "'" ;
        numOfParamsNtNull++;
    }

    if(numOfParamsNtNull > 0) {
        remainQuery = "WHERE " + remainQuery
    }

    var sql = "SELECT * FROM tenders " + remainQuery;
        //console.log(searched_tender_Year);
        //console.log(remainQuery);
    User.query(sql, function (err, results) {
        if (err) {
            throw err;
        }
        console.log(results);
        res.render('searchTender', {fname: req.user.first_name, femail: req.user.email, layout: false, data:results});
    });    
});

module.exports = router;