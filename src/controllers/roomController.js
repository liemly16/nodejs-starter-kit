import {
    Room
} from '../models'
import CrudController from './crudController'


export default class RoomController extends CrudController {
    constructor() {
        super(Room)
    }
}