import {
    BillItem
} from '../models'
import CrudController from './crudController'


export default class BillItemController extends CrudController {
    constructor() {
        super(BillItem)
    }
}