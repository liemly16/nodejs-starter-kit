import CrudRouter from '../crud'
import { billController } from '../../controllers'

export default class Bill extends CrudRouter {
  constructor() {
    super(billController)
  }

  customRouting() {
    this.router.post('/order', this.route(this.orderFilm));
    this.router.post('/findbill', this.route(this.findBill));

  }

  async orderFilm(req, res) {
    const result = await this.Controller.orderFilm(req.body);

    this.onSuccess(res, result);
  }


  async findBill(req, res) {
    const result = await this.Controller.findBill(req.body);

    this.onSuccess(res, result);
  }

}
















