var requireOption = require('../common').requireOption;

/**
 * Módosít egy már meglévõ foglalást, illetve ha vannak újak akkor azokat beszúrja:
 * - 
 */

module.exports = function (objectrepository) {

    return function (req, res) {

        const reservationModel = requireOption(objectrepository, 'reservationModel');

        let removeId;
        const transformedReservationArray = res.tpl.clientSlotStatuses.map(function (clientSlotStatusItem, index) {
            if (clientSlotStatusItem == 'Kijelölve') {
                const reservation = new reservationModel();
                reservation.date = res.tpl.reservationDate;
                reservation.startTime = res.tpl.clientSlotStartTimes[index];
                reservation.endTime = res.tpl.clientSlotEndTimes[index];
                reservation._map = res.tpl.mapId;
                reservation._user = req.session.userid;
                return reservation;
            } else if (res.tpl.slots[index].own && clientSlotStatusItem == 'Szabad') {
                removeId = res.tpl.reservationToModify._id;
            }
            return clientSlotStatusItem;
        });

        const filteredAndTransformedReservationArray = transformedReservationArray.filter(function (clientSlotStatusItem) {
            return clientSlotStatusItem != 'Foglalt' && clientSlotStatusItem != 'Szabad';
        });

        reservationModel.insertMany(filteredAndTransformedReservationArray, function (err) {
            if (err) {
                console.log('updateReservation error: ', error);
                return res.status(500).end();
            }
            reservationModel.remove({ _id: removeId }, function (error) {
                if (error) {
                    console.log('updateReservation error: ', error);
                    return res.status(500).end();
                }
                return res.status(200).end();
            });
        })
    };
};