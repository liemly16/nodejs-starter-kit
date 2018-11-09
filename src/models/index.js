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

Seat.belongsTo(Room, {
    foreignKey: "room_id",
    as: "room"                                                     
})

Room.hasMany(Seat,{
    foreignKey: "room_id",
    as: "seats"
})

ScheduleFilm.belongsTo(Film, {
    foreignKey: "film_id",
    as: "film"
})

Film.hasMany(ScheduleFilm,{
    foreignKey: "room_id",
    as: "schedule_films"
})

ScheduleFilm.belongsTo(Room, {
    foreignKey: "room_id",
    as: "room"
})

Room.hasMany(ScheduleFilm,{
    foreignKey: "room_id",
    as: "schedule_films"
})

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
    Ticket
}