var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var dashboard = require('./routes/dashboard');
var addTender = require('./routes/addTender');
var viewTender = require('./routes/viewTender');
var searchTender = require('./routes/searchTender');
var deleteTender = require('./routes/deleteTender');
var submit = require('./routes/submit');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));



// Passport init
app.use(passport.initialize());
app.use(passport.session());


// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));



// express messages middlewar
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


// connect flash

app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



//====================================================================//

app.use('/',index);

app.use('/users', users);


app.use(function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
       
        return next();
    
} else {
        console.log("You are not logged in");
        res.redirect('/users/login');
    }
});



app.use('/dashboard', dashboard);
app.use('/register',register);
app.use('/addTender', addTender);
app.use('/viewTender', viewTender);
app.use('/searchTender', searchTender);
app.use('/deleteTender', deleteTender);
app.use('/submit', submit);




//====================================================================//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
