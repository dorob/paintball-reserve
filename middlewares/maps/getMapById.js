const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const mapModel = requireOption(objectrepository, 'mapModel');

    return function (req, res, next) {
        mapModel.findOne({'_id': req.params.id}).exec(function(err, result) {
            if (err || (!result)) {
                return res.redirect('/maps');
            }
            res.tpl.map = result;
            next();
        });
    };
};