var requireOption = require('../common').requireOption;


/**
 * Létrehoz egy foglalást
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        const reservationModel = requireOption(objectrepository, 'reservationModel');
        const mapModel = requireOption(objectrepository, 'mapModel');

        let mapId;
        mapModel.find({
            name: res.tpl.clientSelectedMapName
        }, function (err, result) {
            mapId = result[0]._id;

            const filteredClientSlotStatuses = res.tpl.clientSlotStatuses.filter(function (clientSlotStatusItem) {
                return clientSlotStatusItem == 'Kijelölve'
            })

            const transformedReservationArray = filteredClientSlotStatuses.map(function (clientSlotStatusItem, index) {
                if (clientSlotStatusItem == 'Kijelölve') {
                    if (!!mapId) {
                        const reservation = new reservationModel();
                        let date = new Date();
                        date.setFullYear(res.tpl.clientDate.year);
                        date.setMonth(res.tpl.clientDate.month - 1);
                        date.setDate(res.tpl.clientDate.day);
                        const startTime = res.tpl.clientSlotStartTimes[index];
                        const endTime = res.tpl.clientSlotEndTimes[index];
                        const userId = req.session.userid;

                        if (!!userId) {
                            let reservation = new reservationModel();
                            reservation.date = date;
                            reservation.startTime = startTime;
                            reservation.endTime = endTime;
                            reservation._map = mapId;
                            reservation._user = userId;

                            return reservation;
                        }
                    }
                }
            })

            reservationModel.insertMany(transformedReservationArray, function (err) {
                if (!err) {
                    req.session.successfulReservation = true;
                }
                next();
            })
        });
    };
};