var authenticateMW = require('../middlewares/generic/authenticate');
var renderMW = require('../middlewares/generic/render');

var checkReservationMW = require('../middlewares/reservations/checkReservation');
var createReservationMW = require('../middlewares/reservations/createReservation');
var getDailyReservationMW = require('../middlewares/reservations/getDailyReservation');
var getDailyReservationByIdMW = require('../middlewares/reservations/getDailyReservationById');
var updateReservationMW = require('../middlewares/reservations/updateReservation');
var deleteReservationMW = require('../middlewares/reservations/deleteReservation');
var getReservationListByUserIdMW = require('../middlewares/reservations/getReservationListByUserId');
var getReservationMW = require('../middlewares/reservations/getReservation');

var reservationModel = require('../models/reservation');

module.exports = function (app) {

    var objectRepository = {
        reservationModel: reservationModel
    };

    app.get('/reserve/add',
        authenticateMW(objectRepository),
        getDailyReservationMW(objectRepository),
        renderMW(objectRepository, 'reserve'));

    app.post('/reserve/add',
        authenticateMW(objectRepository),
        getDailyReservationMW(objectRepository),
        checkReservationMW(objectRepository),
        createReservationMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/reservations');
        });

    app.post('/reserve/selectdate',
        authenticateMW(objectRepository),
        getDailyReservationMW(objectRepository),
        renderMW(objectRepository, 'reserve'));

    app.get('/reserve/mod/:id',
        authenticateMW(objectRepository),
        getDailyReservationByIdMW(objectRepository),
        renderMW(objectRepository, 'reserve'));

    app.post('/reserve/mod/:id',
        authenticateMW(objectRepository),
        getDailyReservationByIdMW(objectRepository),
        checkReservationMW(objectRepository),
        updateReservationMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/reservations');
        });

    app.get('/reservations/del/:id',
        authenticateMW(objectRepository),
        getReservationMW(objectRepository),
        deleteReservationMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/reservations');
        });

    app.get('/reservations',
        authenticateMW(objectRepository),
        getReservationListByUserIdMW(objectRepository),
        renderMW(objectRepository, 'reservations'));
};