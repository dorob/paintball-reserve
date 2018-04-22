/**
 * Using the template engine render the values into the template
 */
module.exports = function (objectrepository, viewName) {

  return function (req, res) {
    //res.end('Render: ' + viewName);
    res.tpl.reserve_succeed = false;
    res.tpl.reserve_needed = false;
    res.tpl.home_content = true;
    res.tpl.loggedIn = true;
    res.tpl.create = true;
    res.tpl.reservationId = 1;
    res.tpl.date = new Date();
    res.tpl.hasAdminRight = true;
    res.tpl.maps = [
      {
        id: 1,
        name: "Pálya #1",
        outdoor: true
      },
      {
        id: 2,
        name: "Pálya #2",
        outdoor: false
      }
    ]
    res.tpl.slots = ['szabad', 'szabad', 'szabad', 'foglalt', 'foglalt', 'foglalt', 'kijelölve', 'kijelölve', 'kijelölve']
    res.tpl.reservations = [
      {
        date: new Date(),
        mapName: "Pálya #1",
        id: 1,
        past: false
      },
      {
        date: new Date(),
        mapName: "Pálya #2",
        id: 2,
        past: false
      }
    ]
    res.render(viewName, res.tpl);
  };

};