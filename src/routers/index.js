import fs from 'fs'
import path from 'path'
import express from 'express'

let versions = fs.readdirSync(__dirname)
let route = express.Router()
versions.forEach( version => {
  let versionDir = path.join(__dirname, version);
  if (fs.lstatSync(versionDir).isDirectory()) {
    let modules = fs.readdirSync(versionDir)
    let subRoute = express.Router();
    modules.forEach(module => {
      const { default: Router } = require(path.join(__dirname, version, module))
      const router = new Router()
      module = module.split('.')[0]
      subRoute.use(`/${module}`, router.router)
    })
    route.use('/', subRoute)
  }
})

export default route