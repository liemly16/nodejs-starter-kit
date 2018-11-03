import CrudRouter from '../crud'
import { billItemController } from '../../controllers'

export default class BillItem extends CrudRouter {
  constructor() {
    super(billItemController)
  }
}