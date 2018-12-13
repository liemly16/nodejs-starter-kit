var models = require('../dist/models');
var controllers = require('../dist/controllers');
var moment = require('moment');

async function run() {
  await models.Room.destroy({
    where: {

    }
  });

  await controllers.roomController.create({
    "name": "Phòng Chiếu Số 1",
    "type": "2D"
  });
  await controllers.roomController.create({
    "name": "Phòng Chiếu Số 2",
    "type": "3D"
  });
  await controllers.roomController.create({
    "name": "Phòng Chiếu Số 3",
    "type": "2D"
  });
}

run();