module.exports = function (objectrepository) {

  return function (req, res, next) {
    if (!res.tpl.loggedIn && req.session.registrationNeeded) {
      res.tpl.registrationNeeded = true;
      req.session.registrationNeeded = false;
    }
    else {
      res.tpl.registrationNeeded = false;
    }
    next();
  };
};