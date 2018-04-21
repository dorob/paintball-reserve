var requireOption = require('../common').requireOption;

/**
 * Lekéri azokat a foglalásokat amik az ID-hoz tartozó foglalás napján történtek
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};