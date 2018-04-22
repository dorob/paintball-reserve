var renderMW = require('../middlewares/generic/render');

module.exports = function (app) {

    var objectRepository = {
    };

    app.get('/login',
        renderMW(objectRepository, 'login'));

    app.get('/registration',
        renderMW(objectRepository, 'registration'));

    app.get('/forgot',
        renderMW(objectRepository, 'forgot'));

    app.get('/',
        renderMW(objectRepository, 'home'));
}