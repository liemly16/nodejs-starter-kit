import CrudRouter from '../crud'
import { billController } from '../../controllers'

export default class Bill extends CrudRouter {
  constructor() {
    super(billController)
  }

  customRouting() {
    this.router.post('/order', this.route(this.orderFilm));
    this.router.post('/updatestatusbill', this.route(this.updateStatusBill));

  }

  async orderFilm(req, res) {
    const result = await this.Controller.orderFilm(req.body);

    this.onSuccess(res, result);
  }


  async updateStatusBill(req, res) {
    const result = await this.Controller.updateStatusBill(req.body);

    this.onSuccess(res, result);
  }

}
















