import CrudRouter from '../crud'
import { billController } from '../../controllers'

export default class Bill extends CrudRouter {
  constructor() {
    super(billController)
  }

  customRouting() {
    this.router.post('/order', this.route(this.orderFilm));
    this.router.post('/updatestatusbill', this.route(this.updateStatusBill));
    this.router.post('/cancelBill', this.route(this.cancelBill));
    this.router.post('/buyticket', this.route(this.BuyTicket));
  }

  async orderFilm(req, res) {
    const result = await this.Controller.orderFilm(req.body);
    this.onSuccess(res, result);
  }

  async cancelBill(req, res) {
    const result = await this.Controller.cancelBill(req.body);
    this.onSuccess(res, result);
  }

  async updateStatusBill(req, res) {
    const result = await this.Controller.updateStatusBill(req.body);

    this.onSuccess(res, result);
  }

  async BuyTicket(req, res) {
    const result = await this.Controller.BuyTicket(req.body);

    this.onSuccess(res, result);
  }

}

















