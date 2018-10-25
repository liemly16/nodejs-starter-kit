import {
    Example
} from '../models'
import CrudController from './crudController'


export default class ExampleController extends CrudController {
    constructor() {
        super(Example)
    }
}