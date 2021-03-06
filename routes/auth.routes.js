// const { verifySignUp } = require("../middlewares");
// const controller = require("../controllers/auth.controller");
//
// module.exports = function(app) {
//
//     app.use(function(req, res, next) {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });
//
//     app.post(
//         "/api/auth/signup",
//         [
//             verifySignUp.checkDuplicateUsernameOrEmail,
//             verifySignUp.checkRolesExisted
//         ],
//         controller.signup
//     );
//
//     app.get("/login/auth/signin", controller.signin);
// };


var express = require('express');
var router = express.Router();
var passport = require('passport');

const bodyParser = require('body-parser');
var User = require('../models/user.model');

router.use(bodyParser.json());

router.post('/signup', (req, res, next) => {
    User.register(new User({username: req.body.username}),
        req.body.password, (err, user) => {
            if(err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
            }
            else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                });
            }
        });
});

router.post('/login', passport.authenticate('local',

    {

        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page. THIS IS JUST FOR TESTING TO SEE IF THE REDIRECT ON FAIL WORKS.
        failureFlash : true, // allow flash messages

    }), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'You are successfully logged in!'});
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});

module.exports = router;