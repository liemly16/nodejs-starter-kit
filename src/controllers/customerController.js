import {
    Customer
} from '../models'
import CrudController from './crudController'


export default class CustomerController extends CrudController {
    constructor() {
        super(Customer)
    }
}