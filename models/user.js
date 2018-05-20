var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User', {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  hasAdminRight: {
    type: Boolean,
    default: false
  }
});

const user = new User();
user.email = "admin";
user.password = "admin";
user.hasAdminRight = true;
user.save(function (err) {
  if (err) {
    next(new Error("Error while creating user"));
  }
});

module.exports = User;