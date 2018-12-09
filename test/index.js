var models = require('../dist/models');
var controllers = require('../dist/controllers');
var moment = require('moment');

async function run() {
  let film = await models.Film.create({
    name: "Avengers 4",
    start_time: moment().add(5, "days").format(),
    description: '',
    avatar: 'http://genknews.genkcdn.vn/zoom/220_160/2018/12/4/avata-15439400877851740928372.jpg',
    trailer: '',
    status: 'RELEASING'
  });

  console.log("############################");
  let rooms = await controllers.roomController.create({
    "name": "Phòng Chiếu Số 2",
    "type": "2D"
  });

  console.log("##########################");
  let schedule_film = await controllers.ticketController.createScheduleFilm({
    "film_id": film.id,
    "room_id": rooms.room.id,
    "start_time": moment().add(10, "days").format(),
    "price": 80000,
    "price_member": 50000,
    "type": "2D"
  });

  let tickets = await models.Ticket.findAll({
    where: {
      schedule_film_id: schedule_film.id,
      status: 'EMPTY'
    }
  });

  let customer = await models.Customer.create({
    "name": "Lý Thanh Liêm",
    "id_card": "123456789",
    "birthday": "18/5/1998",
    "phone": "0378760860",
  });

  let ids = tickets.map(ticket => ticket.id);

  await controllers.billController.BuyTicket({
    "schedule_film_id": schedule_film.id,
    "tickets": ids,
    "note": "mua ve",
    customer_id: customer.id,
  });

}

run();