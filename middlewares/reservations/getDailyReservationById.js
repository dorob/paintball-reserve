var requireOption = require('../common').requireOption;

/**
 * Lekéri azokat a foglalásokat amik az ID-hoz tartozó foglalás napján történtek
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        const reservationModel = requireOption(objectrepository, 'reservationModel');

        reservationModel.find({ _id: req.params.id }, function (error, result) {
            if (error) {
                console.log('getDailyReservationById error: ', error);
                return res.status(500).end();
            }
            if (result.length == 0) return res.status(404).end();

            res.tpl.mapId = result[0]._map;
            const dateOfReservation = result[0].date;
            res.tpl.reservationDate = dateOfReservation;
            const myReservationStartTime = result[0].startTime;
            const year = dateOfReservation.getFullYear();
            const month = dateOfReservation.getMonth();
            const day = dateOfReservation.getDate();

            reservationModel.find({
                date: { $gte: new Date(year, month, day), $lt: new Date(year, month, day + 1) }         // day+1 hónap utolsó napján nem jó
            }, function (error, result) {
                if (error) {
                    console.log('getDailyReservationById error: ', error);
                    return res.status(500).end();
                }
                if (result.length == 0) return res.status(404).end();

                const slots = [
                    {
                        startTime: 9,
                        endTime: 10,
                        status: 'Szabad'
                    },
                    {
                        startTime: 10,
                        endTime: 11,
                        status: 'Szabad'
                    },
                    {
                        startTime: 11,
                        endTime: 12,
                        status: 'Szabad'
                    },
                    {
                        startTime: 13,
                        endTime: 14,
                        status: 'Szabad'
                    },
                    {
                        startTime: 14,
                        endTime: 15,
                        status: 'Szabad'
                    },
                    {
                        startTime: 15,
                        endTime: 16,
                        status: 'Szabad'
                    },
                    {
                        startTime: 16,
                        endTime: 17,
                        status: 'Szabad'
                    }
                ];

                result.forEach(function (reservationItem) {
                    slots.forEach(function (slotItem) {
                        if (slotItem.startTime == reservationItem.startTime) {
                            slotItem.status = 'Foglalt';
                            if (slotItem.startTime == myReservationStartTime)
                                slotItem.own = true;
                        }
                    });
                });
                res.tpl.slots = slots;
                res.tpl.reservationToModify = result[0];
                return next();
            });
        });
    };
};