import ExampleController from './exampleController';
import EmployeeController from './employeeController';
import FilmController from './filmController';
import CustomerController from './customerController';
import BillController from './billController';
import SeatController from './seatController';
import RoomController from './roomController';
import ScheduleFilmController from './schedulefilmController';
import TicketController from './ticketController';

const exampleController = new ExampleController();
const employeeController= new EmployeeController();
const filmController= new FilmController();
const customerController= new CustomerController();
const billController= new BillController();
const seatController = new SeatController();
const roomController = new RoomController();
const schedulefilmController = new ScheduleFilmController();
const ticketController = new TicketController();

export {
    exampleController,
    employeeController,
    filmController,
    customerController,
    billController,
    seatController,
    roomController,
    schedulefilmController,
    ticketController,
}