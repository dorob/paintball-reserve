var requireOption = require('../common').requireOption;

/**
 * Megnézi hogy a kiválasztott időpontban lehetséges-e foglalni.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        let clientSelectedMap = req.body.selectedMap;
        let clientDate = req.body.date;
        let clientSlotTimes = req.body.slotTimes;
        let clientSlotStatuses = req.body.slotStatuses;


        clientSlotStatuses.forEach(function (clientSlotStatusItem, index) {
            if ($(clientSlotStatusItem).text() == 'Kijelölve') {
                let serverSlot = res.tpl.slots[index];
                if (serverSlot.status == 'Foglalt')
                    res.redirect('/reserve/add');
            }
        });

        res.tpl.clientSelectedMap = clientSelectedMap;
        res.tpl.clientDate = clientDate;
        res.tpl.clientSlotTimes = clientSlotTimes;
        res.tpl.clientSlotStatuses = clientSlotStatuses;

        return next();
    };

};