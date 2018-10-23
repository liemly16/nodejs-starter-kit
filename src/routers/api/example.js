import CrudRouter from '../crud'
import { exampleController } from '../../controllers'

export default class Example extends CrudRouter {
  constructor() {
    super(exampleController)
  }
}