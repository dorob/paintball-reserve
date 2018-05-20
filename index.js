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

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 300000
  },
  resave: true,
  saveUninitialized: false
}));



app.use(function (req, res, next) {

  res.tpl = {};
  res.tpl.error = [];

  res.tpl.reservationToModify = false;
  res.tpl.create = true;
  res.tpl.reservationId = 1;
  //res.tpl.hasAdminRight = false;
  res.tpl.reservations = [
    {
      date: new Date(),
      mapName: 'Pálya #1',
      id: 1,
      past: false
    },
    {
      date: new Date(),
      mapName: 'Pálya #2',
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