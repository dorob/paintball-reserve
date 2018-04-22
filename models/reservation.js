var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Reservation = db.model('Reservation', {
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  time: [{
    type: Number,
    required: true,
    min: 9,
    max: 18
  }],
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