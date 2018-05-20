var requireOption = require('../common').requireOption;

/**
 * Kitörli az összes foglalást ami az adott map id-hez tartozik
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        const reservationModel = requireOption(objectrepository, 'reservationModel');

        const reservationIds = res.tpl.reservationsToDelete.map(function(map) {
            return map._id;
        })
        reservationModel.remove({_id: {$in: reservationIds}}, function(error) {
            if (error) {
                console.log('deleteReservations error: ', error);
                return res.status(500).end();
            }
            return next();
        });
    };

};