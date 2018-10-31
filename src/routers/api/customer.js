import CrudRouter from '../crud'
import { customerController } from '../../controllers'

export default class Customer extends CrudRouter {
  constructor() {
    super(customerController)
  }
}