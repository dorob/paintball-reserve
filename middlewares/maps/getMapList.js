var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    var mapModel = requireOption(objectrepository, 'mapModel');

    return function (req, res, next) {
        mapModel.find({}).exec(function (err, results) {
            if (err) {
                next(new Error('Error getting maps'));
            }
            res.tpl.maps = results;
            next();
        });
    };
};