var requireOption = require('../common').requireOption;

module.exports = function (objectrepository, path) {
    return function (req, res, next) {
        return res.redirect(path);
    };
};