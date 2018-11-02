import {
    Ticket
} from '../models'
import CrudController from './crudController'


export default class TicketController extends CrudController {
    constructor() {
        super(Ticket)
    }
}