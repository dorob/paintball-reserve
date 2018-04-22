var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    var mapModel = requireOption(objectrepository,'mapModel');

    return function (req, res, next) {
        if (typeof res.tpl.map === 'undefined') {
            next();
        }
        var map = new mapModel();
        map.name = req.body['mapName'];
        map.save(function(err) {
            if (err) {
                next(new Error("Something broke while creating new map"));
            }
            next();
        });
    };

};