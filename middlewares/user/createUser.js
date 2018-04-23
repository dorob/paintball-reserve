var requireOption = require('../common').requireOption;
var db = require('../../config/db');

var userModel = require('../../models/user');

/**
 * Create a new user with email and password and with no rights to access admin interface
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (!res.tpl.error.includes('Már létezik egy ilyen felhasználó')) {
            var user = new userModel();
            user.email = req.body.email;
            user.password = req.body.password;
            user.save(function(err) {
                if (err) {
                    next(new Error("Error while creating user"));
                }
                next();
            });
        }
        else
            res.redirect('/register');
    };
};