/**
 * Megnézi hogy a bejelentkezett felhasználónak van-e admin joga
 * - ha igen, akkor nem tesz semmit
 * - ha nem, akkor átirányítja egy hibát jelző oldalra
 */
module.exports = function (objectrepository) {

  return function (req, res, next) {
    return next();
  };

};