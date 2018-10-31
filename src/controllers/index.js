import ExampleController from './exampleController';
import EmployeeController from './employeeController';
import FilmController from './filmController';
import CustomerController from './customerController';
import BillController from './billController';
const exampleController = new ExampleController();
const employeeController= new EmployeeController();
const filmController= new FilmController();
const customerController= new CustomerController();
const billController= new BillController();
export {
    exampleController,
    employeeController,
    filmController,
    customerController,
    billController
}