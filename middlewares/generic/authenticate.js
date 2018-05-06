module.exports = function (objectrepository) {

  return function (req, res, next) {
    if (!req.session.userid) {
      req.session.registrationNeeded = true;
      return res.redirect('/');
    }
    else {
      res.tpl.loggedIn = true;
      res.tpl.email = req.session.email;
    }
    next();
  };

};