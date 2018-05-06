var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (req.session.userid) {
            res.tpl.loggedIn = false;
            req.session.destroy(function (err) {
                return next();
            });
        }
    };
};