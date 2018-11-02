import {
    ScheduleFilm
} from '../models'
import CrudController from './crudController'


export default class ScheduleFilmController extends CrudController {
    constructor() {
        super(ScheduleFilm)
    }
}