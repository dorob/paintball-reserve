var requireOption = require('../common').requireOption;

/**
 * Létrehoz egy foglalást
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};