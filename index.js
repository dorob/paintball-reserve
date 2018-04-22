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