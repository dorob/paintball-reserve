var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Reservation = db.model('Reservation', {
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  startTime: {
    type: Number,
    required: true,
    min: 6,
    max: 20
  },
  endTime: {
    type: Number,
    required: true,
    min: 7,
    max: 21
  },
  _map: {
    type: Schema.Types.ObjectId,
    ref: 'Map'
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Reservation;