var requireOption = require('../common').requireOption;

var userModel = require('../../models/user');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') || (typeof req.body.password === 'undefined')) {
            res.tpl.error.push("Felhasználónév vagy jelszó érvénytelen formátumú");
            return res.redirect('/login');
        }

        userModel.findOne({
            email: req.body.email,
            password: req.body.password
        },
            function (err, result) {
                if (err || !result) {
                    res.tpl.error.push("A felhasználónév vagy jelszó nem helyes");
                    return res.redirect('/login');
                }
                else {
                    req.session.userid = result._id;
                    req.session.email = result.email;
                    if (result.hasAdminRight)
                        req.session.hasAdmin = true;
                    return res.redirect('/');
                }
            });
    };
};