import { Sequelize, sequelize } from './base'
import Example from './example'
import Employee from './employee'
import Film from './film'
import Customer from './customer'
import Bill from './bill'
import Seat from './seat'
import Room from './room'
import ScheduleFilm from './schedule_film'
import BillItem from './bill_item'

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
import Ticket from './ticket'
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