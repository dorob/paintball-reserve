var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    var mapModel = requireOption(objectrepository, 'mapModel');

    return function (req, res, next) {
        if (!req.body.clientMapName) {
            console.log('Missing clientMapName');
            return res.status(400).end();
        }
        mapModel.find({ name: req.body.clientMapName }, function (err, result) {
            if (err) {
                console.log('error in getMapByName: ', err);
                return res.status(500).end();
            }
            res.tpl.choosenMap = result[0];
            next();
        });
    };
};