import {
    errorService
  } from '../services'
  import { BaseError } from '../services/errorService'
  
  export default class BaseMiddleware {
    onError(res, error) {
      if(!error.code || !error.type || !error.message) {
        console.log("UNKNOW ERROR", error)
        const err = errorService.somethingWentWrong()
        res.status(err.code).json(err)
      }else {
        res.status(error.code).json(error)
      }
    }
  
    run() {
      return (req,res,next) => this.use
        .bind(this)(req,res,next,...arguments)
        .catch(error => {
          this.onError(res, error)
        })
    }
  }