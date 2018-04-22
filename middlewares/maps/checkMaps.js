var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    return function (req, res, next) {
        res.tpl.maps.forEach(function (mapItem) {
            if (mapItem.name == req.body.mapName) {
                next(new Error('Error getting tasks'));
            }
        });
        if (req.body['mapName'] === 'undefined') {
            next(new Error('Error getting tasks'));
        }
        next();
    };
};