var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Map = db.model('Map', {
  name: String,
  outdoor: Boolean
});

module.exports = Map;