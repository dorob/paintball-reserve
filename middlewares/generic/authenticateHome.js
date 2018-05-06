module.exports = function (objectrepository) {

  return function (req, res, next) {
    if (req.session.userid) {
      res.tpl.loggedIn = true;
      res.tpl.email = req.session.email;
    }
    else
      res.tpl.loggedIn = false;
    next();
  };

};