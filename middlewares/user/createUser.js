var requireOption = require('../common').requireOption;
var db = require('../../config/db');
var User = require('../../models/user');

/**
 * Create a new user with email and password and with no rights to access admin interface
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        if (req.body.email === undefined) {

        }
        else {
            if (req.body.password === undefined) {

            }
            else {
                var newUser = new User({ email: req.body.email, password: req.body.password });
                newUser.save(function (err, newUser) {
                    if (err)
                        return console.error(err);
                    console.log("New user created with eamil: " + newUser.email);
                });
            }
        }

        return next();
    };

};