import express from 'express'
import BaseRouter from './base'
import {queryMiddlware} from '../middlewares'

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
      queryMiddlware.run()
    ]
  }

  getItemMiddlewares() {
    return [
      queryMiddlware.run()
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
    let result = await this.Controller.delete(req.params)
    this.onSuccess(res, result)
  }

  async getItem(req, res) {
    req.item = await this.Controller.getItem(req.params, req.fields)
    this.onSuccess(res, req.item)
  }

  async getList(req, res) {
    console.log(req.fields);
    req.items = await this.Controller.getList(req.filter, req.pageInfo, req.fields);
    this.onSuccessAsList(res, req.items, undefined, req.pageInfo)
  }

  async update(req, res) {
    req.body = Object.assign(req.body, req.params)
    res.item = await this.Controller.update(req.body)
    this.onSuccess(res, res.item)
  }

  async deleteAll(req, res) {
    req.query.ids = JSON.parse(req.query.ids);
    res.items = await this.Controller.deleteAll(req.query)
    this.onSuccess(res, { deleted: res.items })
  }

}
