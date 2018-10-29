import BaseMiddleware from './base'
import _ from 'lodash';
import { fileURLToPath } from 'url';

export default class QueryMiddleware extends BaseMiddleware {
  async use(req, _res, next, defaultFields = []) {
    defaultFields = _.union(['id', 'updated_at'], defaultFields);
    let fields = this._parseFields(req);
    if (fields.attributes) {
      fields.attributes = _.union(defaultFields, fields.attributes);
    }
    req.fields = fields;

    const filter = this._parseFilter(req)
    req.filter = filter;
    
    const page = parseInt(req.query['page'] || 1);
    const limit = parseInt(req.query['limit'] || 10);
    const offset = parseInt(req.query['offset']) || (page - 1) * limit;

    req.pageInfo = {
      limit,
      offset,
      page
    }

    next()
  }

  _parseFilter(req) {
    let filter = req.query['filter']
    try {
      filter = JSON.parse(filter)
    } catch (ignore) {
      filter = null
    }
    return filter || {}
  }

  _parseFields(req) {
    let fields = req.query['fields']
    try {
      fields = JSON.parse(fields);
    } catch (ignore) {
      fields = []
    }
    try {
      return this._parseAttribute(fields);
    } catch (err) {
      return null;
    }

  }

  _parseAttribute(attrs) {
    let attributes = [];
    let includes = [];
    let isGetAll = false;
    let isSetParanoid = false;
    let where = undefined
    _.forEach(attrs, function (f) {
      if (typeof f === "string") {
        switch (f) {
          case '$all':
            isGetAll = true;
            break;
          case '$paranoid':
            isSetParanoid = true
            break;
          default:
            attributes.push(f)
        }
      }
      else if (typeof f === "object" && !Array.isArray(f)) {
        _.forEach(f, ((value, name) => {
          switch (name) {
            case '$filter':
              where = _.merge({}, where, value)
              break
            default:
              includes.push({
                [name]: value
              })
          }
        }).bind(this))
      }
    });
    let include = this._parseInclude(includes)
    const result = {
      include: include,
      distinct: include ? true : false
    };
    if (where) result.where = where
    if (!isGetAll) {
      result.attributes = attributes
    }
    if (isSetParanoid) {
      result.paranoid = false
    }
    return result
  }

  _parseInclude(includes) {

    if (includes.length === 0) return includes;

    let associates = [];
    _.forEach(includes, ((i) => {
      _.forEach(i, ((attrs, name) => {
        let associate = Object.assign({
          association: name
        }, this._parseAttribute(attrs));
        associates.push(associate);
      }).bind(this))
    }).bind(this));
    return associates;
  }
}
