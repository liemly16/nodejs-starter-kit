import {
    Film
} from '../models'
import CrudController from './crudController'


export default class FilmController extends CrudController {
    constructor() {
        super(Film)
    }
}