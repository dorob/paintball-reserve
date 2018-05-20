var requireOption = require('../common').requireOption;

/**
 * Lekéri az adott napi foglalásokat az adott pályára.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        const reservationModel = requireOption(objectrepository, 'reservationModel');

        reservationModel.find({
            date: {"$gte": new Date(res.tpl.year, res.tpl.month, res.tpl.day), "$lt": new Date(res.tpl.year, res.tpl.month, res.tpl.day + 1)},         // day+1 hónap utolsó napján nem jó
            _map: res.tpl.choosenMap._id,
        }, function (err, result) {
            result.forEach(function (reservationItem) {
                res.tpl.filteredSlots.forEach(function (slotItem) {
                    if (slotItem.startTime == reservationItem.startTime)
                        slotItem.status = 'Foglalt';
                });
            });
            res.tpl.slots = res.tpl.filteredSlots;
            next();
        });
    };
};