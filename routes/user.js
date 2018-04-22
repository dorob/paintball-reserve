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
        function (req, res, next) {
            res.redirect('/');
        });

    app.post('/registration',
        checkUserMW(objectRepository),
        createUserMW(objectRepository),
        function (req, res, next) {
            res.redirect('/');
        });

    app.get('/logout',
        logoutMW(objectRepository),
        function (req, res, next) {
            res.redirect('/');
        });
}