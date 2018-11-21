import {
    sequelize,
    Ticket,
    Room,
    Film,
    ScheduleFilm
} from '../models'
import CrudController from './crudController'
import { errorService } from '../services'


export default class TicketController extends CrudController {
    constructor() {
        super(Ticket)
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

            let schedule_film = await ScheduleFilm.create({
                price: 0,
                price_member: 0,
                start_time: start_time,
                type: type,
                film_id: film_id,
                room_id: room_id
            }, {
                    transaction
                });

            let price = 80000;
            let price_member = 50000;
            let seat = await Seat.findOne({
                    where: {
                        room_id: room_id
                    },
                    transaction
                });

            let ticket = await Ticket.create({
                    schedule_film_id: schedule_film.id,
                    status: 'EMPTY',
                    seat_id: seat.id,
                    total_price: schedule_film.price_member
                }, {
                        transaction
                    });


            






            transaction.commit();

            return schedule_film;
                }
        catch (e) {
            transaction.rollback();
            throw e;
        }


    }

}