var requireOption = require('../common').requireOption;

/**
 * Létrehoz egy foglalást
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        const reservationModel = requireOption(objectrepository, 'reservationModel');

        /*res.tpl.clientSlotStatuses.forEach(function (clientSlotStatusItem, index) {
            if ($(clientSlotStatusItem).text() == 'Kijelölve') {
                var reservation = new reservationModel();
                const year = res.tpl.clientDate.substring(0, 4);
                const month = res.tpl.clientDate.substring(5, 7);
                const day = res.tpl.clientDate.substring(8, 10);
                let starTime

                reservation.date = new Date(year, month, day);

                


                reservation.startTime = clientSlotStatusItem.startTime;
            }
        })*/

        req.session.successfulReservation = true;
        return next();
    };

};