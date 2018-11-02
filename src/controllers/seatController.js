import {
    Seat
} from '../models'
import CrudController from './crudController'


export default class SeatController extends CrudController {
    constructor() {
        super(Seat)
    }
}