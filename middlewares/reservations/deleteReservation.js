var requireOption = require('../common').requireOption;

/**
 * Kitöröl egy megadott ID-jú foglalást
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        const reservationModel = requireOption(objectrepository, 'reservationModel');
        const reservationId = res.tpl.reservationToDelete._id;
        reservationModel.remove({ _id: reservationId }, function(error) {
            if (error) {
                console.log('deleteReservation error: ', error);
                return res.status(500).end();
            }
            return next();
        });
    };

};