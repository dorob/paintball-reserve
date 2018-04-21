var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
mongoose.connect('mongodb://localhost/elyk64');

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('static'))

/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
*/

app.use(function (req, res, next) {
  res.tpl = {};

  return next();
});

require('./routes/reservations')(app);
require('./routes/user')(app);
require('./routes/outside')(app);

app.use(function (err, req, res, next) {
  res.status(500).send('There is a problem');
  console.error(err.stack);
});

var server = app.listen(3000, () => console.log("listen on 3000"))