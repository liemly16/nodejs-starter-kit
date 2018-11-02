import CrudRouter from '../crud'
import { ticketController } from '../../controllers'

export default class Ticket extends CrudRouter {
  constructor() {
    super(ticketController)
  }
}