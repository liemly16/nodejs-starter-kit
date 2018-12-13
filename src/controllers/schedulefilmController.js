import {
    ScheduleFilm,
    BillItem,
    Bill,

    sequelize
} from '../models'
import CrudController from './crudController'
import _ from 'lodash';

export default class ScheduleFilmController extends CrudController {
    constructor() {
        super(ScheduleFilm)
    }

    async reportTicket(params) {
        let {
            type,
            start_time,
            end_time
        } = params;

        let query = "";

        switch (type) {
            case 'DAY':
                query = `
            SELECT COUNT(*), "tbl_film".id, "tbl_film".name, Extract(day from "tbl_bill_item".created_at) AS day, Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
                WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
                AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_bill".status = 'PAID' AND "tbl_film".deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'
                GROUP BY day, month, year, "tbl_film".id
                ORDER BY year ASC, month ASC, day ASC
            `;

                break;
            case 'MONTH':
                query = `
            SELECT COUNT(*), "tbl_film".id, "tbl_film".name, Extract(month from "tbl_bill_item".created_at) AS month, Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
                WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
                AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_bill".status = 'PAID' AND "tbl_film".deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'
                GROUP BY month, year, "tbl_film".id
                ORDER BY year ASC, month ASC
            `;

                break;
            case 'YEAR':
                query = `
            SELECT COUNT(*), "tbl_film".id, "tbl_film".name, Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
                WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
                AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_bill".status = 'PAID' AND "tbl_film".deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'
                GROUP BY year, "tbl_film".id
                ORDER BY year ASC
            `;
                break;
        }

        let result = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        return _.groupBy(result, "id");
    }

    async reportTicketCancel(params) {
        let {
            start_time,
            end_time,
            type
        } = params;

        let query = "";

        // query = `SELECT CAST (COUNT(*) as float) / ((SELECT count(*) from tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
        // WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
        // AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_film".id = film.id AND film.deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'))
        // as value, film.id, film.name, Extract(day from "tbl_bill_item".created_at) AS day, Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film as film, tbl_bill
        // WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
        // AND "tbl_schedule_film".film_id = film.id AND "tbl_bill".status = 'CANCEL' AND film.deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'
        // GROUP BY day, month, year, film.id, film.name
        // ORDER BY year ASC, month ASC, day ASC
        // `;
        console.log(params);

        switch (type) {
            case 'DAY':
                query = `SELECT CAST (COUNT(*) as float) / ((SELECT count(*) from tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
        WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
        AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_film".id = film.id AND "tbl_film".deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'))
        as value, film.id, film.name, Extract(day from "tbl_bill_item".created_at) AS day, Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film as film, tbl_bill
        WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
        AND "tbl_schedule_film".film_id = film.id AND "tbl_bill".status = 'CANCEL' AND film.deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'
        GROUP BY day, month, year, film.id, film.name
        ORDER BY year ASC, month ASC, day ASC
        `;
                break;
            case 'WEEK':
                query = `SELECT CAST (COUNT(*) as float) / ((SELECT count(*) from tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
        WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
        AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_film".id = film.id AND "tbl_film".deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'))
        as value, film.id, film.name, Extract(week from "tbl_bill_item".created_at) AS week,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film as film, tbl_bill
        WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
        AND "tbl_schedule_film".film_id = film.id AND "tbl_bill".status = 'CANCEL' AND film.deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'
        GROUP BY week, year, film.id, film.name
        ORDER BY year ASC, week ASC
        `;
                break;
            case 'MONTH':
                query = `SELECT CAST (COUNT(*) as float) / ((SELECT count(*) from tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
        WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
        AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_film".id = film.id AND "tbl_film".deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'))
        as value, film.id, film.name, Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film as film, tbl_bill
        WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
        AND "tbl_schedule_film".film_id = film.id AND "tbl_bill".status = 'CANCEL' AND film.deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'
        GROUP BY month, year, film.id, film.name
        ORDER BY year ASC, month ASC
        `;
                break;
            case 'QUARTER':
                query = `SELECT CAST (COUNT(*) as float) / ((SELECT count(*) from tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
        WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
        AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_film".id = film.id AND "tbl_film".deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'))
        as value, film.id, film.name, Extract(quarter from "tbl_bill_item".created_at) AS quarter,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film as film, tbl_bill
        WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
        AND "tbl_schedule_film".film_id = film.id AND "tbl_bill".status = 'CANCEL' AND film.deleted_at IS NULL AND "tbl_bill_item".created_at >= '${start_time}' AND "tbl_bill_item".created_at <= '${end_time}'
        GROUP BY quarter, year, film.id, film.name
        ORDER BY year ASC, quarter ASC
        `;
                break;
        }

        let result =  await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        return _.groupBy(result, 'id');
    }
}