import CrudRouter from '../crud'
import { roomController } from '../../controllers'

export default class Room extends CrudRouter {
  constructor() {
    super(roomController) // viet sai ten
  }
}