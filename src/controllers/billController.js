import {
    Bill
} from '../models'
import CrudController from './crudController'


export default class BillController extends CrudController {
    constructor() {
        super(Bill)
    }
}