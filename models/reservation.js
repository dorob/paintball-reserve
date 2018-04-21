var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Reservation = db.model('Reservation', {
  map: String,
  date: String,
  time: String,
  _assignedto: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
});

module.exports = Reservation;