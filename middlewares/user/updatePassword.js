var requireOption = require('../common').requireOption;

var userModel = require('../../models/user');

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') || (typeof req.body.oldPassword === 'undefined')) {
            next(new Error("email or password is not defined"));
        }

        userModel.findOne({
            email: req.body.email,
            password: req.body.oldPassword
        },
            function (err, result) {
                if ((err) || (result === null)) {
                    console.log("nem talaltuk");
                    res.tpl.error.push("Nem létezik felhasználó ilyen felhasználóval és jelszóval");
                }

                else {
                    //console.log(req.body.newPassword);
                    userModel.update({
                        _id: result._id
                    }, {
                            $set: { password: req.body.newPassword }
                        },function() {
                            //console.log(result._id);
                        });
                }
                next();
            });
    };
};