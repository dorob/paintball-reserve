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
    default:false 
  }
});

module.exports = User;