var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('static'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {

    res.tpl = {};

    res.tpl.reserve_succeed = false;
    res.tpl.reserve_needed = false;
    res.tpl.home_content = true;
    res.tpl.loggedIn = true;
    res.tpl.create = true;
    res.tpl.reservationId = 1;
    res.tpl.date = new Date();
    res.tpl.hasAdminRight = true;
    res.tpl.slots = ['szabad', 'szabad', 'szabad', 'foglalt', 'foglalt', 'foglalt', 'kijelölve', 'kijelölve', 'kijelölve']
    res.tpl.reservations = [
      {
        date: new Date(),
        mapName: "Pálya #1",
        id: 1,
        past: false
      },
      {
        date: new Date(),
        mapName: "Pálya #2",
        id: 2,
        past: false
      }
    ]

  return next();
});

require('./routes/reservations')(app);
require('./routes/user')(app);
require('./routes/maps')(app);
require('./routes/outside')(app);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

var server = app.listen(3000, () => console.log("listen on 3000"))