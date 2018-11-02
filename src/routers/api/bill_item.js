import CrudRouter from '../crud'
import { bill_itemController } from '../../controllers'

export default class Bill_item extends CrudRouter {
  constructor() {
    super(bill_itemController)
  }
}