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
            
            let count= seats.length;
            for (let i=0;i<count;i++) {
                let ticket = await Ticket.create({
                        schedule_film_id: schedule_film.id,
                        status: 'EMPTY',
                        seat_id:seats[i].id
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