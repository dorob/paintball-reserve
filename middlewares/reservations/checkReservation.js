var requireOption = require('../common').requireOption;

/**
 * Megnézi hogy a kiválasztott időpontban lehetséges-e foglalni.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        const clientSlotStatuses = req.body.clientSlotStatuses;

        clientSlotStatuses.forEach(function (clientSlotStatusItem, index) {
            if (clientSlotStatusItem == 'Kijelölve') {
                const serverSlot = res.tpl.slots[index];
                if (serverSlot.status == 'Foglalt') {
                    res.redirect('/reserve/add');
                }
            }
        });

        res.tpl.clientSelectedMapName = req.body.clientMapName;
        res.tpl.clientDate = req.body.clientDate;
        res.tpl.clientSlotStartTimes = req.body.clientSlotStartTimes;
        res.tpl.clientSlotEndTimes = req.body.clientSlotEndTimes;
        res.tpl.clientSlotStatuses = clientSlotStatuses;

        return next();
    };

};