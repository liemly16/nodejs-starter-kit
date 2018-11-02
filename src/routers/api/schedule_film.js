import CrudRouter from '../crud'
import { schedulefilmController } from '../../controllers'

export default class ScheduleFilm extends CrudRouter {
  constructor() {
    super(schedulefilmController)
  }
}