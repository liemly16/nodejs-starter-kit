import {
    sequelize,
    Bill,
    BillItem,
    ScheduleFilm,
    Ticket
} from '../models'
import CrudController from './crudController'
import { errorService } from '../services'
import { isNullOrUndefined } from 'util';
import moment from 'moment';


export default class BillController extends CrudController {
    constructor() {
        super(Bill)
    }

    async orderFilm(params) {
        let {
            schedule_film_id,
            tickets,
            customer_id,
            employee_id,
            note
        } = params;

        const transaction = await sequelize.transaction({ isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ });

        try {
            // handle code
            // check

            let schedule_film = await ScheduleFilm.findOne({
                where: {
                    id: schedule_film_id
                },
                transaction
            });

            // generate data
            let bill = await Bill.create({
                total_price: 0,
                note: note,
                customer_id: customer_id,
                status: 'UNPAID',
                employee_id: employee_id
            },
                {
                    transaction
                });

            let total_price = 0;
            for (let i in tickets) {
                let ticket = await Ticket.findOne({
                    where: {
                        id: tickets[i]
                    },
                    include: [
                        {
                            association: 'seat'
                        }
                    ],
                    transaction
                });
                if (ticket.status != 'EMPTY') throw errorService.error("Vé đã được đặt");

                let bill_item = await BillItem.create({
                    bill_id: bill.id,
                    ticket_id: tickets[i],
                    total_price: schedule_film.price_member
                }, {
                        transaction
                    });

                await Ticket.update({
                    status: 'ORDERED'
                }, {
                        where: {
                            id: tickets[i]
                        },
                        transaction
                    })

                total_price += schedule_film.price_member;
                total_price += ticket.seat.sub_fee;
            }

            await bill.update({
                total_price: total_price
            }, {
                    transaction
                });

            transaction.commit();

            return bill;
        }
        catch (e) {
            transaction.rollback();
            throw e;
        }


    }

    async updateStatusBill(params) {
        let {
            bill_id,
        } = params;
        const transaction = await sequelize.transaction();
        try {
            let bill = await Bill.findOne({
                where: {
                    id: bill_id
                },
                transaction
            });


            await bill.update({
                status: 'PAID'
            },
                {
                    where: {
                        id: bill_id
                    },
                    transaction
                })
            let bill_items = await BillItem.findAll({
                where: {
                    bill_id: bill_id
                },
                transaction
            });
            let count = bill_items.length;
            for (let i = 0; i < count; i++) {
                let ticket = await Ticket.findOne({
                    where: {
                        id: bill_items[i].ticket_id
                    },
                    transaction
                });
                await ticket.update({
                    status: 'SOLD'
                },
                    {
                        where: {
                            id: bill_items[i].ticket_id
                        },
                        transaction
                    });
            }

            transaction.commit();

            return bill;
        }
        catch (e) {

            transaction.rollback();
            console.log(e);
            throw e;
        }
    }
    //-------------------------------
    async BuyTicket(params) {
        let {
            schedule_film_id,
            tickets,
            customer_id,
            employee_id,
            note
        } = params;

        //Tao transaction
        const transaction = await sequelize.transaction({ isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ });

        try {

            let schedule_film = await ScheduleFilm.findOne({
                where: {
                    id: schedule_film_id
                },
                transaction
            });

            // generate data
            let bill = await Bill.create({
                total_price: 0,
                note: note,
                customer_id: customer_id,
                employee_id: employee_id
            },
                {
                    transaction
                });

            let total_price = 0;
            for (let i in tickets) {
                let ticket = await Ticket.findOne({
                    where: {
                        id: tickets[i]
                    },
                    include: [{
                        association: 'seat'
                    }],
                    transaction
                });
                if (ticket.status != 'EMPTY') throw errorService.error("Vé đã được đặt");

                let bill_item = await BillItem.create(
                    {
                        bill_id: bill.id,
                        ticket_id: tickets[i],
                        total_price: schedule_film.price,
                        //created_at: moment().add(-1, "days").format()
                    },
                    {
                        transaction
                    });


                if (customer_id) {
                    await bill_item.update(
                        {
                            total_price: schedule_film.price_member
                        },
                        {
                            transaction
                        }
                    )
                    total_price += schedule_film.price_member;
                }
                else {
                    total_price += schedule_film.price;
                }
                total_price += ticket.seat.sub_fee;
                await Ticket.update({
                    status: 'SOLD'
                }, {
                        where: {
                            id: tickets[i]
                        },
                        transaction
                    }

                )

            }
            //Tra tien lien -> Cap nhat trang thai bill
            await bill.update({
                total_price: total_price,
                status: 'PAID'
            },
                {
                    transaction
                });

            transaction.commit();

            return bill;
        }
        catch (e) {
            transaction.rollback();
            throw e;
        }


    }

    async cancelBill(params) {
        let {
            bill_id,
        } = params;
        const transaction = await sequelize.transaction();
        try {
            let bill = await Bill.findOne({
                where: {
                    id: bill_id
                },
                transaction
            });


            await bill.update({
                status: 'CANCEL'
            },
                {
                    where: {
                        id: bill_id
                    },
                    transaction
                })
            let bill_items = await BillItem.findAll({
                where: {
                    bill_id: bill_id
                },
                transaction
            });
            let count = bill_items.length;
            for (let i = 0; i < count; i++) {
                let ticket = await Ticket.findOne({
                    where: {
                        id: bill_items[i].ticket_id
                    },
                    transaction
                });
                await ticket.update({
                    status: 'EMPTY'
                },
                    {
                        where: {
                            id: bill_items[i].ticket_id
                        },
                        transaction
                    });
            }

            transaction.commit();

            return bill;
        }
        catch (e) {

            transaction.rollback();
            console.log(e);
            throw e;
        }
    }

    async updateOrderFilm(params) {
        let {
            bill_id,
            tickets
        } = params;

        const transaction = await sequelize.transaction({ isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ });

        try {
            let bill = await Bill.findOne({
                where: {
                    id: bill_id
                },
                include: [
                    {
                        association: 'bill_items'
                    }
                ],
                transaction
            });

            let ids = bill.bill_items.map(item => item.id);
            let ticket_ids = bill.bill_items.map(item => item.ticket_id);

            await Promise.all([
                BillItem.destroy({
                    where: {
                        id: {
                            $in: ids
                        }
                    },
                    transaction
                }),
                Ticket.update({
                    status: 'EMPTY'
                }, {
                        where: {
                            id: {
                                $in: ticket_ids
                            }
                        },
                        transaction
                    })
            ]);

            let total_price = 0;
            for (let i in tickets) {
                let ticket = await Ticket.findOne({
                    where: {
                        id: tickets[i]
                    },
                    include: [
                        {
                            association: 'seat'
                        },
                        {
                            association: 'schedule_film'
                        }
                    ],
                    transaction
                });
                if (ticket.status != 'EMPTY') throw errorService.error("Vé đã được đặt");

                let bill_item = await BillItem.create({
                    bill_id: bill.id,
                    ticket_id: tickets[i],
                    total_price: ticket.schedule_film.price_member
                }, {
                        transaction
                    });

                await Ticket.update({
                    status: 'ORDERED'
                }, {
                        where: {
                            id: tickets[i]
                        },
                        transaction
                    })

                total_price += ticket.schedule_film.price_member;
                total_price += ticket.seat.sub_fee;
            }

            await bill.update({
                total_price: total_price
            }, {
                    transaction
                });


            transaction.commit();

            return bill;
        }
        catch (e) {
            transaction.rollback();
            throw e;
        }

    }

}

