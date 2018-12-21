import {
    sequelize,
    Ticket,
    Room,
    Film,
    Seat,
    ScheduleFilm
} from '../models'
import CrudController from './crudController'
import { errorService } from '../services'
import moment from 'moment';


export default class TicketController extends CrudController {
    constructor() {
        super(Ticket)
    }

    async checkRoom(params) {
        let {
            room_id
        } = params;

        const transaction = await sequelize.transaction();

        try {
            let fromTime = moment().add(5, "hours").utc().format();
            let toTime = moment().add(9, "hours").utc().format();
            let schedule_film = await ScheduleFilm.findOne({
                where: {
                    $or: [
                        {
                            room_id: room_id,
                            start_time: {
                                $gte: fromTime
                            }
                        },
                        {
                            room_id: room_id,
                            start_time: {
                                $lte: toTime
                            }
                        }
                    ]
                }
            });

            if (schedule_film) {
                transaction.commit();
                return {
                    status: false
                }
            }
            else {
                transaction.commit();
                return {

                    status: true
                }
            }
        }
        catch (e) {
            transaction.rollback();
            throw e;
        }

    }

    async createScheduleFilm(params) {
        let {
            film_id,
            room_id,
            start_time,
            price,
            price_member,
            type
        } = params;

        const transaction = await sequelize.transaction();

        try {

            let fromTime = moment(start_time).add(5, "hours").format();
            let toTime = moment(start_time).add(9, "hours").format();
            let schedule_film = await ScheduleFilm.findOne({
                where: {
                    room_id: room_id,
                    start_time: {
                        $and: [
                            {
                                $gte: fromTime
                            },
                            {
                                $lte: toTime
                            }
                        ]
                    }

                },
                transaction
            });
            if (schedule_film) throw errorService.error("Phòng không còn trống");

            let film = await Film.findOne({
                where: {
                    id: film_id
                },
                transaction
            });

            let room = await Room.findOne({
                where: {
                    id: room_id
                },
                transaction
            });

            schedule_film = await ScheduleFilm.create({
                price: price,
                price_member: price_member,
                start_time: start_time,
                type: type,
                film_id: film_id,
                room_id: room_id
            }, {
                    transaction
                });
            let seats = await Seat.findAll({
                where: {
                    room_id: room_id
                }, transaction
            });

            let count = seats.length;
            for (let i = 0; i < count; i++) {
                let ticket = await Ticket.create({
                    schedule_film_id: schedule_film.id,
                    status: 'EMPTY',
                    seat_id: seats[i].id
                }, {
                        transaction
                    });

            };

            transaction.commit();

            return schedule_film;
        }
        catch (e) {
            transaction.rollback();
            throw e;
        }
    }

}