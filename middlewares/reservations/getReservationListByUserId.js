var requireOption = require('../common').requireOption;

/**
 * Kikeresi az adott User ID-hoz tartozó foglalásokat
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        const reservationModel = requireOption(objectrepository, 'reservationModel');
        reservationModel.find({ _user: req.session.userid }, function(error, result) {
            if (error) {
                console.log('getReservationListByUserId error: ', error);
                return next(error);
            }
            res.tpl.reservations = result;
            return next();
        });
    };

};