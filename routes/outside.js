const authenticateHomeMW = require('../middlewares/generic/authenticateHome');
const checkIfRegistrationNeededMW = require('../middlewares/generic/checkIfRegistrationNeeded');
const checkIfSuccessfulReservationMW = require('../middlewares/generic/checkIfSuccessfulReservation');
const renderMW = require('../middlewares/generic/render');

module.exports = function (app) {

    const objectRepository = {
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