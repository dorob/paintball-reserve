var authenticateMW = require('../middlewares/generic/authenticate');
var redirectMW = require('../middlewares/generic/redirect');
var renderMW = require('../middlewares/generic/render');

var checkReservationMW = require('../middlewares/reservations/checkReservation');
var createReservationMW = require('../middlewares/reservations/createReservation');
var getDailyReservationMW = require('../middlewares/reservations/getDailyReservation');
var getDailyReservationByIdMW = require('../middlewares/reservations/getDailyReservationById');
var updateReservationMW = require('../middlewares/reservations/updateReservation');
var deleteReservationMW = require('../middlewares/reservations/deleteReservation');
var getReservationListByUserIdMW = require('../middlewares/reservations/getReservationListByUserId');
var transformReservationsMW = require('../middlewares/reservations/transformReservations');
var getReservationMW = require('../middlewares/reservations/getReservation');
const getChoosenDateMW = require('../middlewares/reservations/getChoosenDate');
const getChoosenMapMW = require('../middlewares/reservations/getChoosenMap');
const getMapByNameMW = require('../middlewares/reservations/getMapByName');

var getMapListMW = require('../middlewares/maps/getMapList');

var reservationModel = require('../models/reservation');
var mapModel = require('../models/map');

module.exports = function (app) {

    var objectRepository = {
        reservationModel: reservationModel,
        mapModel: mapModel
    };

    app.get(['/reserve/add', '/reserve/add/:date'],
        authenticateMW(objectRepository),
        getMapListMW(objectRepository),
        getChoosenMapMW(objectRepository),
        getChoosenDateMW(objectRepository),
        getDailyReservationMW(objectRepository),
        renderMW(objectRepository, 'reserve'));

    app.post('/reserve/add',
        authenticateMW(objectRepository),
        getMapByNameMW(objectRepository),
        getDailyReservationMW(objectRepository),
        checkReservationMW(objectRepository),
        createReservationMW(objectRepository));

    app.get('/reserve/mod/:id',
        authenticateMW(objectRepository),
        getDailyReservationByIdMW(objectRepository),
        renderMW(objectRepository, 'reserve'));

    app.post('/reserve/mod/:id',
        authenticateMW(objectRepository),
        getDailyReservationByIdMW(objectRepository),
        checkReservationMW(objectRepository),
        updateReservationMW(objectRepository));

    app.get('/reservations/del/:id',
        authenticateMW(objectRepository),
        getReservationMW(objectRepository),
        deleteReservationMW(objectRepository),
        redirectMW(objectRepository, '/reservations'));

    app.get('/reservations',
        authenticateMW(objectRepository),
        getReservationListByUserIdMW(objectRepository),
        transformReservationsMW(objectRepository),
        renderMW(objectRepository, 'reservations'));
};