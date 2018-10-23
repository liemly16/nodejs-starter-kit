import {
    Example
} from '../models'
import CrudController from './crudController'


export default class AgendaSpeakerController extends CrudController {
    constructor() {
        super(Example)
    }
}