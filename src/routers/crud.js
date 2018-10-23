import express from 'express'
import BaseRouter from './base'

export default class CrudRouter extends BaseRouter {
  constructor(Controller) {
    super()
    this.Controller = Controller
    this.router = express.Router();
    this.customRouting();
    this.defaultRouting();
  }

  defaultRouting() {
    this.router.get('/', this.getListMiddlewares(), this.route(this.getList))
    this.router.get('/:id', this.getItemMiddlewares(), this.route(this.getItem))
    this.router.post('/', this.createMiddlewares(), this.route(this.create))
    this.router.put('/:id', this.updateMiddlewares(), this.route(this.update))
    this.router.delete('/:id', this.deleteMiddlewares(), this.route(this.delete))
    this.router.delete('/', this.deleteAllMiddlewares(), this.route(this.deleteAll))
  }

  customRouting() {

  }

  getListMiddlewares() {
   
    return [
    
    ]
  }

  getItemMiddlewares() {
    return [
     
    ]
  }

  createMiddlewares() {
    return [
     
    ]
  }

  updateMiddlewares() {
    return [
    ]
  }

  deleteMiddlewares() {
    return [
    ]
  }

  deleteAllMiddlewares() {
    return [
    ]
  }

  async create(req, res) {
    res.item = await this.Controller.create(req.body)
    this.onSuccess(res, res.item)
  }

  async delete(req, res) {
    await this.Controller.delete(req.params)
    this.onSuccess(res)
  }

  async getItem(req, res) {
    req.item = await this.Controller.getItem(req.params, req.scopes, req.fields)
    this.onSuccess(res, req.item)
  }

  async getList(req, res) {
    req.items = await this.Controller.getList(req.params)
    this.onSuccessAsList(res, req.items, undefined, req.pageInfo)
  }

  async update(req, res) {
    req.body = Object.assign(req.body, req.params)
    res.item = await this.Controller.update(req.body, req.scopes)
    this.onSuccess(res, res.item)
  }

  async deleteAll(req, res) {
    let { items } = req.query
    try {
      items = JSON.parse(items);
    } catch (err) {
      items = null;
    }
    req.params.id = items
    res.items = await this.Controller.deleteAll(req.params)
    this.onSuccess(res, { deleted: res.items })
  }
}
