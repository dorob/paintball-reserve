var requireOption = require('../common').requireOption;

/**
 * ID alapján lekér egy foglalást
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        const reservationModel = requireOption(objectrepository, 'reservationModel');
        reservationModel.find({ _id: req.params.id }, function(error, result) {
            if (error) {
                console.log('getReservation error: ', error);
                return res.status(500).end();
            }
            if (result.length == 0) return res.status(404).end();
            res.tpl.reservationToDelete = result[0];
            return next();
        });
    };

};