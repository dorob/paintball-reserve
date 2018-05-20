var requireOption = require('../common').requireOption;

/**
 * Átformálja az adatbázisból kapott foglalásokat olyan formára ahogy a reservations.ejs-ben fogjuk használni.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        const mapIds = res.tpl.reservations.map(function(reservation) {
            return reservation._map;
        });
        const mapModel = requireOption(objectrepository, 'mapModel');
        mapModel.find({ _id: { $in: mapIds } }, function(error, maps) {
            if (error) {
                console.log('transformReservations error: ', error);
                return res.status(500).end();
            }

            const transformedReservations = res.tpl.reservations.map(function(reservation) {
                const map = maps.find(function(element) {
                    return element._id.toString() == reservation._map.toString();
                });
                return {
                    id: reservation._id,
                    date: reservation.date,
                    mapName: map.name,
                    past: Date.now() > reservation.date,
                    startTime: reservation.startTime
                }
            });
            res.tpl.reservations = transformedReservations;
            return next();
        });
    };

};