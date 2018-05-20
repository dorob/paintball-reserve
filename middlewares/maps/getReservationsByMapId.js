const requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    const reservationModel = requireOption(objectrepository, 'reservationModel');

    return function (req, res, next) {
        reservationModel.find({'_map': req.params.id}).exec(function(err, result) {
            if (err || (!result)) {
                return res.redirect('/maps');
            }
            if (result.length == 0) {
                return next();
            }
            
            res.tpl.reservationsToDelete = result;
            next();
        });
    };
};