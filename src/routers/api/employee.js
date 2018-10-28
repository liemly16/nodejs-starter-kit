import CrudRouter from '../crud'
import { employeeController } from '../../controllers'

export default class Employee extends CrudRouter {
  constructor() {
    super(employeeController)
  }
}