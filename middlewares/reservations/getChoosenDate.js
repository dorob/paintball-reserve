/**
 * Ha kaptunk URL-ben valid dátumot akkor az lesz a kiválasztott nap, egyéb esetben a mai nap.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        let choosenDate;
        if (!!req.params.date) {
            const dateParts = req.params.date.split('-');
            const yearIsValid = !!parseInt(dateParts[0], 10);
            const monthIsValid = parseInt(dateParts[1], 10) >= 1 && parseInt(dateParts[1], 10) <= 12;
            const dayIsValid = parseInt(dateParts[2], 10) >= 1 && parseInt(dateParts[2], 10) <= 31;
            if (yearIsValid && monthIsValid && dayIsValid) {
                choosenDate = new Date(req.params.date);
            } else {
                choosenDate = new Date();
            }
        } else {
            choosenDate = new Date();
        }
        res.tpl.year = choosenDate.getFullYear();
        res.tpl.month = choosenDate.getMonth();
        res.tpl.day = choosenDate.getDate();
        return next();
    };
};