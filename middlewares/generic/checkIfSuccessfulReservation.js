module.exports = function (objectrepository) {

  return function (req, res, next) {
    if (res.tpl.loggedIn && req.session.successfulReservation) {
      res.tpl.successfulReservation = true;
      req.sessions.successfulReservation = false;
    }
    else {
      res.tpl.successfulReservation = false;
    }
    next();
  };
};