import {
    Bill_item
} from '../models'
import CrudController from './crudController'


export default class Bill_itemController extends CrudController {
    constructor() {
        super(Bill_item)
    }
}