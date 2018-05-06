var requireOption = require('../common').requireOption;

/**
 * Megnézi hogy a kiválasztott időpontban lehetséges-e foglalni.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        let clientSelectedMapName = req.body.clientMapName;
        let clientDate = req.body.clientDate;
        let clientSlotStartTimes = req.body.clientSlotStartTimes;
        let clientSlotEndTimes = req.body.clientSlotEndTimes;
        let clientSlotStatuses = req.body.clientSlotStatuses;

        clientSlotStatuses.forEach(function (clientSlotStatusItem, index) {
            if (clientSlotStatusItem == 'Kijelölve') {
                let serverSlot = res.tpl.slots[index];
                if (serverSlot.status == 'Foglalt') {
                    res.redirect('/reserve/add');
                }

            }
        });

        res.tpl.clientSelectedMapName = clientSelectedMapName;
        res.tpl.clientDate = clientDate;
        res.tpl.clientSlotStartTimes = clientSlotStartTimes;
        res.tpl.clientSlotEndTimes = clientSlotEndTimes;
        res.tpl.clientSlotStatuses = clientSlotStatuses;

        //console.log("mapname ",clientSelectedMapName);
        //console.log("date ",clientDate);
        /*console.log("clientSlotStartTimes ",clientSlotStartTimes);
        console.log("clientSlotEndTime ",clientSlotEndTimes);
        console.log("clientSlotStatuses ",clientSlotStatuses);*/

        return next();
    };

};