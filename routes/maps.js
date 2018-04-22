var authenticateMW = require('../middlewares/generic/authenticate');
var authorizateMW = require('../middlewares/generic/authorizate');

var getMapByIdMW = require('../middlewares/maps/getMapById');
var deleteMapMW = require('../middlewares/maps/deleteMap');
var checkMapsMW = require('../middlewares/maps/checkMaps');
var createMapMW = require('../middlewares/maps/createMap');
var getMapsMW = require('../middlewares/maps/getMaps');

var renderMW = require('../middlewares/generic/render');

var mapsModel = require('../models/map');

module.exports = function (app) {

    var objectRepository = {
        mapsModel: mapsModel
    };

    app.get('/maps/del/:id',
        authenticateMW(objectRepository),
        authorizateMW(objectRepository),
        getMapByIdMW(objectRepository),
        deleteMapMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/maps');
        });

    app.get('/maps/add',
        authenticateMW(objectRepository),
        authorizateMW(objectRepository),
        checkMapsMW(objectRepository),
        createMapMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/maps');
        });

    app.get('/maps',
        authenticateMW(objectRepository),
        authorizateMW(objectRepository),
        getMapsMW(objectRepository),
        renderMW(objectRepository, 'maps'));

}