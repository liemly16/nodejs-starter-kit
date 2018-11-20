import CrudRouter from '../crud'
import { billController } from '../../controllers'

export default class Bill extends CrudRouter {
  constructor() {
    super(billController)
  }

  customRouting(){
    this.router.post('/order', this.route(this.orderFilm));
  }

  async orderFilm(req, res){
    const result = await this.Controller.orderFilm(req.body);

    this.onSuccess(res,result);
  }

}