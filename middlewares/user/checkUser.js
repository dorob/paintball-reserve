var requireOption = require('../common').requireOption;

var userModel = require('../../models/user');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') || (typeof req.body.password === 'undefined')) {
            next(new Error("Email or password undefined"));
        }
        
        userModel.findOne({
            email: req.body.email
        }, function (err, result) {
            if ((err) || (result !== null)) {
                res.tpl.error.push('Már létezik egy ilyen felhasználó');
            }
            next();
        });
    };
};