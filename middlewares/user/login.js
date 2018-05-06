var requireOption = require('../common').requireOption;

var userModel = require('../../models/user');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') || (typeof req.body.password === 'undefined')) {
            next(new Error("email or password is not defined"));
        }

        userModel.findOne({
            email: req.body.email,
            password: req.body.password
        },
            function (err, result) {
                if ((err) || (result === null))
                    res.tpl.error.push("A felhasználónév vagy jelszó nem jó");
                else {
                    req.session.userid = result._id;
                    req.session.email = result.email;
                }
                next();
            });
    };
};