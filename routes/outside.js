var renderMW = require('../middlewares/generic/render');

module.exports = function (app) {

    var objectRepository = {
    };

    app.get('/login',
        renderMW(objectRepository, 'login'));

    app.get('/register',
        renderMW(objectRepository, 'register'));

    app.get('/forgot',
        renderMW(objectRepository, 'forgot'));

    app.get('/',
        renderMW(objectRepository, 'home'));
}