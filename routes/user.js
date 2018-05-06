var authenticateMW = require('../middlewares/generic/authenticate');
var redirectMW = require('../middlewares/generic/redirect');

var loginMW = require('../middlewares/user/login');
var checkUserMW = require('../middlewares/user/checkUser');
var createUserMW = require('../middlewares/user/createUser');
var logoutMW = require('../middlewares/user/logout');

var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    app.post('/login',
        loginMW(objectRepository),
        redirectMW(objectRepository,'/'));

    app.post('/register',
        checkUserMW(objectRepository),
        createUserMW(objectRepository),
        redirectMW(objectRepository,'/login'));

    app.get('/logout',
        logoutMW(objectRepository),
        redirectMW(objectRepository,'/'));
}