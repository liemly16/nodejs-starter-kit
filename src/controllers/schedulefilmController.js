import {
    Schedule_film
} from '../models'
import CrudController from './crudController'


export default class SchedulefilmController extends CrudController {
    constructor() {
        super(Schedule_film)
    }
}