import CrudRouter from '../crud'
import { schedulefilmController } from '../../controllers'

export default class Schedule_film extends CrudRouter {
  constructor() {
    super(schedulefilmController) // viet sai ten
  }
}