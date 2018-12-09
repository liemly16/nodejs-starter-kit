import CrudRouter from '../crud'
import { schedulefilmController } from '../../controllers'

export default class ScheduleFilm extends CrudRouter {
  constructor() {
    super(schedulefilmController)
  }

  customRouting() {
    this.router.post('/report/ticket/cancel', this.route(this.reportTicketCancel));
    this.router.post('/report/ticket', this.route(this.reportTicket));
  }

  async reportTicketCancel(req, res) {
    const result = await this.Controller.reportTicketCancel(req.body);
    this.onSuccess(res, result);
  }

  async reportTicket(req, res) {
    const result = await this.Controller.reportTicket(req.body);
    this.onSuccess(res, result);
  }

}