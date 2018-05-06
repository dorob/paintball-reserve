var requireOption = require('../common').requireOption;

/**
 * Lekéri az adott napi foglalásokat.
 * Ha teljesen új foglalás történik, akkor a mai napra kérdezi le,
 * ha kaptunk foglalás ID-t, akkor az ahhoz a naphoz tartozó foglalásokat kéri le.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        const reservationModel = requireOption(objectrepository, 'reservationModel');

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();

        let slots = [
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
        ]

        reservationModel.find({
            date: {"$gte": new Date(year,month,day), "$lt": new Date(year,month,day+1)}         // day+1 hónap utolsó napján nem jó
        }, function (err, result) {
            result.forEach(function (reservationItem) {
                slots.forEach(function (slotItem) {
                    if (slotItem.startTime == reservationItem.startTime)
                        slotItem.status = 'Foglalt';
                });
            });
            res.tpl.slots = slots;
            next();
        });
    };
};