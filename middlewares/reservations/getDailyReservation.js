var requireOption = require('../common').requireOption;

/**
 * Lekéri az adott napi foglalásokat az adott pályára.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        const reservationModel = requireOption(objectrepository, 'reservationModel');
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

        const year = res.tpl.year || req.body.clientDate.year;
        const month = res.tpl.month|| req.body.clientDate.month;
        const day = res.tpl.day || req.body.clientDate.day;

        reservationModel.find({
            date: {"$gte": new Date(year, month, day), "$lt": new Date(year, month, day + 1)},         // day+1 hónap utolsó napján nem jó
            _map: res.tpl.choosenMap._id,
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