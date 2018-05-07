var authenticateMW = require('../middlewares/generic/authenticate');
var redirectMW = require('../middlewares/generic/redirect');
var renderMW = require('../middlewares/generic/render');
var loginMW = require('../middlewares/user/login');
var checkUserMW = require('../middlewares/user/checkUser');
var updatePasswordMW = require('../middlewares/user/updatePassword');
var createUserMW = require('../middlewares/user/createUser');
var logoutMW = require('../middlewares/user/logout');

var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    app.post('/forgot',
        updatePasswordMW(objectRepository),
        redirectMW(objectRepository,'/'));

    app.post('/login',
        loginMW(objectRepository));

    app.post('/register',
        checkUserMW(objectRepository),
        createUserMW(objectRepository),
        redirectMW(objectRepository,'/login'));

    app.get('/logout',
        logoutMW(objectRepository),
        redirectMW(objectRepository,'/'));
}