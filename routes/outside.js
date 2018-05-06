var authenticateHomeMW = require('../middlewares/generic/authenticateHome');
var checkIfRegistrationNeededMW = require('../middlewares/generic/checkIfRegistrationNeeded');
var checkIfSuccessfulReservationMW = require('../middlewares/generic/checkIfSuccessfulReservation');
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
        authenticateHomeMW(objectRepository),
        checkIfRegistrationNeededMW(objectRepository),
        checkIfSuccessfulReservationMW(objectRepository),
        renderMW(objectRepository, 'home'));
}