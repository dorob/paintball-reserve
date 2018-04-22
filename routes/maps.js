var authenticateMW = require('../middlewares/generic/authenticate');
var authorizateMW = require('../middlewares/generic/authorizate');
var redirectMW = require('../middlewares/generic/redirect');
var renderMW = require('../middlewares/generic/render');

var getMapByIdMW = require('../middlewares/maps/getMapById');
var deleteMapMW = require('../middlewares/maps/deleteMap');
var checkMapsMW = require('../middlewares/maps/checkMaps');
var createMapMW = require('../middlewares/maps/createMap');
var getMapListMW = require('../middlewares/maps/getMapList');

var mapModel = require('../models/map');

module.exports = function (app) {

    var objectRepository = {
        mapModel: mapModel
    };

    app.get('/maps/del/:id',
        authenticateMW(objectRepository),
        authorizateMW(objectRepository),
        getMapByIdMW(objectRepository),
        deleteMapMW(objectRepository),
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