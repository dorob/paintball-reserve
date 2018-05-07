var requireOption = require('../common').requireOption;


/**
 * Létrehoz egy foglalást
 */

module.exports = function (objectrepository) {

    return function (req, res) {

        const reservationModel = requireOption(objectrepository, 'reservationModel');
        const mapModel = requireOption(objectrepository, 'mapModel');

        mapModel.find({
            name: res.tpl.clientSelectedMapName
        }, function (err, result) {
            if (err) return res.status(500).end();
            if (result.length == 0) return res.status(404).end();

            const mapId = result[0]._id;

            const transformedReservationArray = res.tpl.clientSlotStatuses.map(function (clientSlotStatusItem, index) {
                if (clientSlotStatusItem == 'Kijelölve') {
                    if (!!mapId) {
                        const date = new Date();
                        date.setFullYear(res.tpl.clientDate.year);
                        date.setMonth(res.tpl.clientDate.month - 1);
                        date.setDate(res.tpl.clientDate.day);
                        const startTime = res.tpl.clientSlotStartTimes[index];
                        const endTime = res.tpl.clientSlotEndTimes[index];
                        const userId = req.session.userid;

                        const reservation = new reservationModel();
                        reservation.date = date;
                        reservation.startTime = startTime;
                        reservation.endTime = endTime;
                        reservation._map = mapId;
                        reservation._user = userId;

                        return reservation;
                    }
                } else {
                    return clientSlotStatusItem;
                }
            })

            const filteredAndTransformedReservationArray = transformedReservationArray.filter(function (clientSlotStatusItem) {
                return clientSlotStatusItem != 'Foglalt' && clientSlotStatusItem != 'Szabad';
            })

            reservationModel.insertMany(filteredAndTransformedReservationArray, function (err) {
                if (!err) {
                    req.session.successfulReservation = true;
                }
                res.status(200).end();
            })
        });
    };
};