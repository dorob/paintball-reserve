const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') || (typeof req.body.password === 'undefined')) {
            res.tpl.error.push('Email or password undefined');
            return next();
        }

        userModel.findOne({
            email: req.body.email
        }, function (err, result) {
            if (err) {
                res.tpl.error.push('adatbázis hiba');
            } else if (result !== null) {
                res.tpl.error.push('Már létezik egy ilyen felhasználó');
            }
            next();
        });
    };
};