/**
 * Megnézi hogy a felhasználó be van-e jelentkezve
 * - ha igen, akkor nem tesz semmit
 * - ha nem, akkor átirányítja egy hibát jelző oldalra
 */
module.exports = function (objectrepository) {

  return function (req, res, next) {
    return next();
  };

};