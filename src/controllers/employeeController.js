import {
    Employee
} from '../models'
import CrudController from './crudController'

export default class EmployeeController extends CrudController {
    constructor() {
        super(Employee)
    }
}