var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (res.tpl.loggedIn) {
            res.tpl.loggedIn = false;
        }
        next();
    };

};