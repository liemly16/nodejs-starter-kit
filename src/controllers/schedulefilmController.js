import {
    ScheduleFilm,
    BillItem,
    Bill,

    sequelize
} from '../models'
import CrudController from './crudController'


export default class ScheduleFilmController extends CrudController {
    constructor() {
        super(ScheduleFilm)
    }

    async reportTicket(params) {
        let {
            film_id,
            type
        } = params;

        let query = "";

        if (film_id) {
            switch (type) {
                case 'DAY':
                    query = `  SELECT COUNT(*), Extract(day from "tbl_bill_item".created_at) AS day, Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
            WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
            AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_film".id = '${film_id}' AND "tbl_bill".status = 'CANCEL'
            GROUP BY day, month, year
            ORDER BY year ASC, month ASC, day ASC
            `;
                    break;
                case 'MONTH':
                    query = `  SELECT COUNT(*), Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
            WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
            AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_film".id = '${film_id}' AND "tbl_bill".status = 'PAID'
            GROUP BY month, year
            ORDER BY year ASC, month ASC
            `;
                    break;
                case 'WEEK':
                    query = `  SELECT COUNT(*), Extract(week from "tbl_bill_item".created_at) AS weekly, Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
                WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
                AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_bill".status = 'PAID' AND "tbl_film".id = '${film_id}'
                GROUP BY weekly, month, year
                ORDER BY year ASC, month ASC, weekly ASC
                `;
                    break;
                default:
                    break;
            }
        }
        else {
            switch (type) {
                case 'DAY':
                    query = `  SELECT COUNT(*), Extract(day from "tbl_bill_item".created_at) AS day, Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
                WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
                AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_bill".status = 'PAID'
                GROUP BY day, month, year
                ORDER BY year ASC, month ASC, day ASC
                `;
                    break;
                case 'MONTH':
                    query = `  SELECT COUNT(*), Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
                WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
                AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_bill".status = 'PAID'
                GROUP BY month, year
                ORDER BY year ASC, month ASC
                `;
                    break;
                case 'WEEK':
                    query = `  SELECT COUNT(*), Extract(week from "tbl_bill_item".created_at) AS weekly, Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
                WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
                AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_bill".status = 'PAID'
                GROUP BY weekly, month, year
                ORDER BY year ASC, month ASC, weekly ASC
                `;
                    break;
                default:
                    break;
            }
        }

        return await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
    }

    async reportTicketCancel(params) {
        let {
            film_id,
            type
        } = params;

        let query = "";

        if (film_id) {
            switch (type) {
                case 'DAY':
                    query = `  SELECT COUNT(*), Extract(day from "tbl_bill_item".created_at) AS day, Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
            WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
            AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_film".id = '${film_id}' AND "tbl_bill".status = 'CANCEL'
            GROUP BY day, month, year
            ORDER BY year ASC, month ASC, day ASC
            `;
                    break;
                case 'MONTH':
                    query = `  SELECT COUNT(*), Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
            WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
            AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_film".id = '${film_id}' AND "tbl_bill".status = 'CANCEL'
            GROUP BY month, year
            ORDER BY year ASC, month ASC
            `;
                    break;
                case 'QUARTER':
                    query = `  SELECT COUNT(*), Extract(quarter from "tbl_bill_item".created_at) AS quarter,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
            WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
            AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_film".id = '${film_id}' AND "tbl_bill".status = 'CANCEL'
            GROUP BY quarter, year
            ORDER BY year ASC, quarter ASC
            `;
                    break;
                default:
                    break;
            }
        }
        else {
            switch (type) {
                case 'DAY':
                    query = `  SELECT COUNT(*), Extract(day from "tbl_bill_item".created_at) AS day, Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
                WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
                AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_bill".status = 'CANCEL'
                GROUP BY day, month, year
                ORDER BY year ASC, month ASC, day ASC
                `;
                    break;
                case 'MONTH':
                    query = `  SELECT COUNT(*), Extract(month from "tbl_bill_item".created_at) AS month,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
                WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
                AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_bill".status = 'CANCEL'
                GROUP BY month, year
                ORDER BY year ASC, month ASC
                `;
                    break;
                case 'QUARTER':
                    query = `  SELECT COUNT(*), Extract(quarter from "tbl_bill_item".created_at) AS quarter,  Extract(year from "tbl_bill_item".created_at) AS year FROM tbl_bill_item, tbl_ticket, tbl_schedule_film, tbl_film, tbl_bill
                WHERE "tbl_bill_item".ticket_id = "tbl_ticket".id AND "tbl_ticket".schedule_film_id = "tbl_schedule_film".id AND "tbl_bill".id = "tbl_bill_item".bill_id
                AND "tbl_schedule_film".film_id = "tbl_film".id AND "tbl_bill".status = 'CANCEL'
                GROUP BY quarter, year
                ORDER BY year ASC, quarter ASC
                `;
                    break;
                default:
                    break;
            }
        }


        return await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
    }
}