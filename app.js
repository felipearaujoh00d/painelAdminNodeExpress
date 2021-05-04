const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const path = require('path');

const app = express();
//
// var corsOptions = {
//     origin: "http://localhost:8888"
// };
//
// app.use(cors(corsOptions));

const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

const db = require("./models");
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// // view engine setup
app.set('views', path.join(__dirname, 'src/pug'));
app.set('view engine', 'pug');

// simple route
app.get("/", (req, res) => {
    // res.json({ message: "Welcome to bezkoder application." });

    res.render('page-login')
});

app.use(express.static(__dirname + '/docs'));

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/dashboard.routes")(app);

// // set port, listen for requests
// const PORT = process.env.PORT || 8888;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}


// const express = require('express');
// const path = require('path');
// const bodyParser = require("body-parser");
// const dbConfig = require("./config/db.config");
// const app = express();
//
// const cors = require("cors");
//
// const db = require("./models");
// const Role = db.role;
//
// require('./routes/auth.routes')(app);
// require('./routes/user.routes')(app);
//
// var corsOptions = {
//     origin: "http://localhost:8888"
// };
//
// app.use(cors(corsOptions));
//
// // parse requests of content-type - application/json
// app.use(bodyParser.json());
//
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
//
//
//
// db.mongoose
//     .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log("Successfully connect to MongoDB.");
//         initial();
//     })
//     .catch(err => {
//         console.error("Connection error", err);
//         process.exit();
//     });
//
// function initial() {
//     Role.estimatedDocumentCount((err, count) => {
//         if (!err && count === 0) {
//             new Role({
//                 name: "user"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }
//
//                 console.log("added 'user' to roles collection");
//             });
//
//             new Role({
//                 name: "moderator"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }
//
//                 console.log("added 'moderator' to roles collection");
//             });
//
//             new Role({
//                 name: "admin"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }
//
//                 console.log("added 'admin' to roles collection");
//             });
//         }
//     });
// }
//
//
//
// // view engine setup
// app.set('views', path.join(__dirname, 'src/pug'));
// app.set('view engine', 'pug');
//
// app.get('/', function (req, res) {
//     res.render('page-login')
// });
//
// app.use(express.static(__dirname + '/docs'));
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
//
module.exports = app;