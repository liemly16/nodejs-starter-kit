import CrudRouter from '../crud'
import { ticketController } from '../../controllers'

export default class Ticket extends CrudRouter {
  constructor() {
    super(ticketController)
  }

  customRouting() {
    this.router.post('/create', this.route(this.createScheduleFilm));
    this.router.post('/check', this.route(this.checkRoom));
  }

  async createScheduleFilm(req, res) {
    const result = await this.Controller.createScheduleFilm(req.body);

    this.onSuccess(res, result);
  }

  async checkRoom(req, res) {
    console.log(req.body);
    const result = await this.Controller.checkRoom(req.body);
    this.onSuccess(res, result);
  }

}