var requireOption = require('../common').requireOption;

/**
 * Lekéri az adott napi foglalásokat.
 * Ha teljesen új foglalás történik, akkor a mai napra kérdezi le,
 * ha kaptunk foglalás ID-t, akkor az ahhoz a naphoz tartozó foglalásokat kéri le.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};