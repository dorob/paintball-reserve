var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof res.tpl.map === 'undefined') {
            next();
        }
        res.tpl.map.remove(function(err) {
            if (err) {
                next(new Error("Something broke while deleting map"));
            }
            next();
        });
    };

};