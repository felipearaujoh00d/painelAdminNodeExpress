const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
var authenticate = require('./middlewares/authenticate');
var session = require('express-session');

// var mongoose = require('mongoose');
// var passport = require('passport');
// var session = require('express-session');
// var LocalStrategy = require('passport-local').Strategy;
// var User = require('./models/user.model');

var passport = require('passport');
var indexRouter = require('./routes/auth.routes');
const flash = require('connect-flash');
const connect = require('./db.js');
const app = express();

app.use(session({ cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// // view engine setup
app.set('views', path.join(__dirname, 'src/pug'));
app.set('view engine', 'pug');

// simple route
app.get("/", (req, res) => {
    res.render('page-login',  {
        error: req.flash("error"),
    })
});
app.use('/users', indexRouter);
require("./routes/dashboard.routes")(app);

app.use(express.static(__dirname + '/docs'));

// routes
// require("./routes/auth.routes");
// require("./routes/user.routes")(app);


// app.use('/', indexRouter);


// Basic Authentication for session and cookies
function auth (req, res, next) {
    if (!req.user) {
        var err = new Error('You are not authenticated!');
        err.status = 403;
        next(err);
    }
    else {
        next();
    }
}
app.use(auth);


module.exports = app;