import { Sequelize, sequelize } from './base'
import Example from './example'
import Employee from './employee'
import Film from './film'
import Customer from './customer'
import Bill from './bill'
import Seat from './seat'
import Room from './room'
import ScheduleFilm from './schedule_film'
import Ticket from './ticket'
import BillItem from './bill_item'

Seat.belongsTo(Room, {
    foreignKey: "room_id",
    as: "room"
})

Room.hasMany(Seat, {
    foreignKey: "room_id",
    as: "seats"
})

ScheduleFilm.belongsTo(Film, {
    foreignKey: "film_id",
    as: "film"
})

Film.hasMany(ScheduleFilm, {
    foreignKey: "room_id",
    as: "schedule_films"
})

ScheduleFilm.belongsTo(Room, {
    foreignKey: "room_id",
    as: "room"
})

Room.hasMany(ScheduleFilm, {
    foreignKey: "room_id",
    as: "schedule_films"
})

Bill.belongsTo(Customer, {
    foreignKey: "customer_id",
    as: "customer"
})

Customer.hasMany(Bill, {
    foreignKey: "customer_id",
    as: "bills"
})

Bill.belongsTo(Employee, {
    foreignKey: "employee_id",
    as: "employee"
})

Employee.hasMany(Bill, {
    foreignKey: "employee_id",
    as: "bills"
})

BillItem.belongsTo(Ticket, {
    foreignKey: "ticket_id",
    as: "ticket"
})

Ticket.hasMany(BillItem, {
    foreignKey: "ticket_id",
    as: "bill_items"
})

BillItem.belongsTo(Bill, {
    foreignKey: "bill_id",
    as: "bill"
})

Bill.hasMany(BillItem, {
    foreignKey: "bill_id",
    as: "bill_items"
});
Ticket.belongsTo (ScheduleFilm,{
    foreignKey: "schedule_film_id",
    as: "schedule_film"
})

ScheduleFilm.hasMany(Ticket,{
   foreignKey: "schedule_film_id",
   as:  "tickets"
})

Ticket.belongsTo (Seat,{
    foreignKey: "seat_id",
    as: "seat"
})

Seat.hasMany (Ticket,{
    foreignKey: "seat_id",
    as:"tickets"
})

export {
    Sequelize,
    sequelize,

    Example,
    Employee,
    Film,
    Customer,
    Bill,
    Seat,
    Room,
    ScheduleFilm,
    Ticket,
    BillItem,
}