var authMW = require('../middlewares/generic/auth');
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
        authMW(objectRepository),
        getDailyReservationMW(objectRepository),
        renderMW(objectRepository, 'reserve'));

    app.post('/reserve/add',
        authMW(objectRepository),
        getDailyReservationMW(objectRepository),
        checkReservationMW(objectRepository),
        createReservationMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/reservations');
        });

    app.post('/reserve/selectdate',
        authMW(objectRepository),
        getDailyReservationMW(objectRepository),
        renderMW(objectRepository, 'reserve'));

    app.get('/reserve/mod/:id',
        authMW(objectRepository),
        getDailyReservationByIdMW(objectRepository),
        renderMW(objectRepository, 'reserve'));

    app.post('/reserve/mod/:id',
        authMW(objectRepository),
        getDailyReservationByIdMW(objectRepository),
        checkReservationMW(objectRepository),
        updateReservationMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/reservations');
        });

    app.get('/reservations/del/:id',
        authMW(objectRepository),
        getReservationMW(objectRepository),
        deleteReservationMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/reservations');
        });

    app.get('/reservations',
        authMW(objectRepository),
        getReservationListByUserIdMW(objectRepository),
        renderMW(objectRepository, 'reservations'));
};