var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Reservation = db.model('Reservation', {
  mapId: {
      type: Schema.Types.ObjectId,
      ref: 'Map'
  },
  date: String,
  time: [{
    type: Date
  }],
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
});

module.exports = Reservation;