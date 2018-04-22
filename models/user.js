var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User', {
  email: String,
  password: String,
  hasAdminRight: { type: Boolean, default:false }
});

module.exports = User;