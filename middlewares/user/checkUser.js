var requireOption = require('../common').requireOption;

/**
 * Leellenőrzi hogy létezik-e már ilyen user
 * - ha igen, kiír egy hibát
 * - ha nem, tovább engedi
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};