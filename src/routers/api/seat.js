import CrudRouter from '../crud'
import { seatController } from '../../controllers'

export default class Seat extends CrudRouter {
  constructor() {
    super(seatController)
  }
}


