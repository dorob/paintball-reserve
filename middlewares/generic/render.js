/**
 * Using the template engine render the values into the template
 */
module.exports = function (objectrepository, viewName) {

  return function (req, res) {
    //res.end('Render: ' + viewName);
    res.tpl.reserve_succeed = false;
    res.tpl.reserve_needed = false;
    res.tpl.home_content = true;
    res.tpl.loggedIn = false;
    res.tpl.create = true;
    res.tpl.reservationId = 1;
    res.tpl.date = new Date();
    res.tpl.slots = ['szabad','szabad','szabad','foglalt','foglalt','foglalt','kijelölve','kijelölve','kijelölve']
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