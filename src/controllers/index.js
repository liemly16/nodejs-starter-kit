import ExampleController from './exampleController';
import EmployeeController from './employeeController';
import CustomerController from './customerController'

const exampleController = new ExampleController();
const employeeController = new EmployeeController();
const customerController = new CustomerController();

export {
    exampleController,
    employeeController,
    customerController
}