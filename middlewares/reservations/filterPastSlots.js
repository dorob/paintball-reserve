/**
 * Kiveszi a slotok közül azokat amik mai napon már elmúltak
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

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

        res.tpl.year = res.tpl.year || req.body.clientDate.year;
        res.tpl.month = res.tpl.month|| req.body.clientDate.month;
        res.tpl.day = res.tpl.day || req.body.clientDate.day;

        const now = new Date();

        if (res.tpl.year == now.getFullYear() && res.tpl.month == now.getMonth() && res.tpl.day == now.getDate()) {
            res.tpl.filteredSlots = slots.filter(function(slot) {
                return slot.startTime > now.getHours();
            });
        } else {
            res.tpl.filteredSlots = slots;
        }
        next();
    };
};