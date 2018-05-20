/**
 * Ha kaptunk URL-ben valid pályát akkor az lesz a kiválasztott pálya, egyéb esetben a sorban a legelsõ.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (!req.query.map) {
            res.tpl.choosenMap = res.tpl.maps[0];
            return next();
        }
        const choosenMap = res.tpl.maps.find(function(map) {
            return map.name === req.query.map;
        });
        res.tpl.choosenMap = choosenMap || res.tpl.maps[0];
        return next();
    };
};