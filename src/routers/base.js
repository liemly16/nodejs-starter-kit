import {
    errorService
} from '../services'

  export default class BaseRouter {
  
    onError(res, error) {
      if(!error.code || !error.type || !error.message) {
        console.log("UNKNOW ERROR", error)
        const err = errorService.somethingWentWrong();
        res.status(err.code).json(err)
      }else {
        res.status(error.code).json(error)
      }
    }
  
    onSuccess(res, object = {}) {
      if (object.toJSON) {
        object = object.toJSON()
      }
      object = object || {}
      if (Object.keys(object).length === 0) {
        res.json({
          code: 200
        })
      } else {
        res.json({
          code: 200,
          results: object
        })
      }
    }
  
    onSuccessAsList(res, objects = [], extras = {}, currentPage = {page: 1}) {
      if (objects.toJSON) {
        objects = objects.toJSON()
      }
      res.json({
        code: 200,
        results: Object.assign({
          objects
        }, extras),
        pagination: {
          'current_page': currentPage.page,
          'next_page': currentPage.page + 1,
          'prev_page': currentPage.page - 1,
          'limit' : currentPage.limit
        }
      })
    }
  
    route(func) {
      return (req, res) => func
        .bind(this)(req, res)
        .catch(error => {
          this.onError(res, error)
        })
    }
  }