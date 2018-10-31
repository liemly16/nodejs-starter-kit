import CrudRouter from '../crud'
import { filmController } from '../../controllers'

export default class Film extends CrudRouter {
  constructor() {
    super(filmController)
  }
}