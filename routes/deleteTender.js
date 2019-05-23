var express = require('express');
var User = require('../model/users');
var passport = require('passport');
var router = express.Router();

//get delete tender page with results from database
router.get('/', function (req,res)  {
    console.log("In-deleteTender");
    
     var sql = "SELECT * FROM tenders";
    User.query(sql, function (err, results) {
        if (err) {
            throw err;
        }
        console.log(results);
         res.render('deleteTender', {fname: req.user.first_name, femail: req.user.email, layout:false, data:results});
            });
});
 
 
//post request delete tenders function
router.post('/',function (req,res)  {
    console.log("Post-function deleteTender");
    var searched_tender_date1 = req.body.searchDate1;
    var searched_tender_Institution1 = req.body.searchInstitution1;
    var searched_tender_Year1 = req.body.searchYear1;
    var searched_tender_Item1 = req.body.searchItem1;
    var searched_tender_number = req.body.searchTenderNumber1;
    var searched_tender_price = req.body.searchPrice1;
    var remainQuery1 = "";
    var numOfParamsNtNull1 = 0;


    if(searched_tender_date1 !== ""){
        
        remainQuery1 += "Opening_date = " + "'" + searched_tender_date1 + "'"  ; 
        numOfParamsNtNull1++;
    }
    else if(searched_tender_Institution1 !== ""){
                
        if(numOfParamsNtNull1 > 0){
            remainQuery1 +=  " OR ";
        }
        remainQuery1 += "Cust_name = " + "'" + searched_tender_Institution1 + "'";
        numOfParamsNtNull1++;
    }
    else if(searched_tender_Year1 !== ""){
        if(numOfParamsNtNull1 > 0){
            remainQuery1 +=  " OR ";
        }
        remainQuery1 += "Year = " + "'" + searched_tender_Year1 + "'";
        numOfParamsNtNull1++;
    }
    else if(searched_tender_Item1 !== "") {
        if(numOfParamsNtNull1 > 0){
            remainQuery1 +=  " OR ";
        }
        remainQuery1 += "Item_name = " + "'" + searched_tender_Item1 + "'" ;
        numOfParamsNtNull1++;
    }
    else if(searched_tender_number1 !== "") {
        if(numOfParamsNtNull > 0){
            remainQuery +=  " OR ";
        }
        remainQuery += "Cust_number = " + "'" + searched_tender_number1 + "'" ;
        numOfParamsNtNull++;
    }
    else if(searched_tender_price1 !== "") {
        if(numOfParamsNtNull > 0){
            remainQuery +=  " OR ";
        }
        remainQuery += "Price = " + "'" + searched_tender_price1 + "'" ;
        numOfParamsNtNull++;
    }

    if(numOfParamsNtNull1 > 0) {
        remainQuery1 = "WHERE " + remainQuery1
    }

    var sql = "SELECT * FROM tenders " + remainQuery1;
    console.log(req.headers.host);
    console.log(remainQuery1);
    User.query(sql, function (err, results) {
        if (err) {
            throw err;
        }
            //console.log(results);
        res.render('deleteTender', {layout: false, data:results});
    });    
});

router.get('/delete/:id',function(req,res){

    console.log("Inside /delete/:id");
    var delete_id = req.params.id;
    var ip = "35.192.70.32:3000";
        //console.log(delete_id);
    var sqldelete = "DELETE FROM tenders where Cust_id = '"+delete_id+"' ";
   User.query(sqldelete, function (err, results) {
        if (err) {
            throw err;
        }
        //console.log(results);
        res.redirect('/deleteTender' );
    });   
});

module.exports = router