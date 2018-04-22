var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Map = db.model('Map', {
  name: {
    type: String,
    required: true
  }
});

module.exports = Map;