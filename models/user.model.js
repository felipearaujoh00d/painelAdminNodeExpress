// const mongoose = require("mongoose");
//
// const User = mongoose.model(
//     "User",
//     new mongoose.Schema({
//         username: String,
//         email: String,
//         password: String,
//         roles: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Role"
//             }
//         ]
//     })
// );
//
// module.exports = User;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    // username: {
    //     type: String,
    //     unique: true,
    //     required: true
    // }
    username: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);