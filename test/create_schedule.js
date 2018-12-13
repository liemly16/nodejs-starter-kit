var models = require('../dist/models');
var controllers = require('../dist/controllers');
var moment = require('moment');

async function run() {
  await models.ScheduleFilm.destroy({
where: {
  
}
  });

  let films = await models.Film.findAll({
    where: {

    }
  });

  let rooms = await models.Room.findAll({
    where: {

    }
  });

  for (let film of films) {
    let day = 1;
    for (let room of rooms) {
      let schedule_film = await controllers.ticketController.createScheduleFilm({
        "film_id": film.id,
        "room_id": room.id,
        "start_time": moment().add(day, "days").add(1, "hours").format(),
        "price": 80000,
        "price_member": 50000,
        "type": room.type
      });
    }
    day++;
  }

}

run();