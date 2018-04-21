var renderMW = require('../middlewares/generic/render');

var userModel = requre('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    app.get('/login',
        renderMW(objectRepository, 'login'));

    app.get('/registration',
        renderMW(objectRepository, 'registration'));

    app.get('/',
        renderMW(objectRepository, 'home'));

    app.get('/forgot',
        renderMW(objectRepository, 'forgot'));
}