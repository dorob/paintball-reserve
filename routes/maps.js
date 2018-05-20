var authenticateMW = require('../middlewares/generic/authenticate');
var authorizateMW = require('../middlewares/generic/authorizate');
var redirectMW = require('../middlewares/generic/redirect');
var renderMW = require('../middlewares/generic/render');

var getMapByIdMW = require('../middlewares/maps/getMapById');
var getReservationsByMapIdMW = require('../middlewares/maps/getReservationsByMapId');
var deleteMapMW = require('../middlewares/maps/deleteMap');
var deleteReservationsMW = require('../middlewares/reservations/deleteReservations');
var checkMapsMW = require('../middlewares/maps/checkMaps');
var createMapMW = require('../middlewares/maps/createMap');
var getMapListMW = require('../middlewares/maps/getMapList');

var mapModel = require('../models/map');
var reservationModel = require('../models/reservation');

module.exports = function (app) {

    var objectRepository = {
        mapModel: mapModel,
        reservationModel: reservationModel  
    };

    app.get('/maps/del/:id',
        authenticateMW(objectRepository),
        authorizateMW(objectRepository),
        getMapByIdMW(objectRepository),
        getReservationsByMapIdMW(objectRepository),
        deleteMapMW(objectRepository),
        deleteReservationsMW(objectRepository),
        redirectMW(objectRepository,'/maps'));

    app.post('/maps/add',
        authenticateMW(objectRepository),
        authorizateMW(objectRepository),
        getMapListMW(objectRepository),
        checkMapsMW(objectRepository),
        createMapMW(objectRepository),
        redirectMW(objectRepository,'/maps'));

    app.get('/maps',
        authenticateMW(objectRepository),
        authorizateMW(objectRepository),
        getMapListMW(objectRepository),
        renderMW(objectRepository, 'maps'));

}