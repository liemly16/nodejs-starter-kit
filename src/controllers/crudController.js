import { errorService } from '../services'

export default class CrudControler {
    constructor(Model) {
        this.Model = Model
    }

    async exec(promise) {
        try {
            let result = await promise;
            if (result === null)
                throw errorService.error("Record not found");
            return result;
        } catch (err) {
            if (err.errors) {
                if (err.errors && err.errors[0]) {
                    throw errorService.sequelizeException(err.errors[0].message)
                } else {
                    throw errorService.sequelizeException(err.message)
                }
            } else {
                throw errorService.somethingWentWrong()
            }
        }
    }

    async create(params) {
        return await this.exec(this.Model.create(params));
    }

    async delete(params) {
        const item = await this.exec(this.getItem(params));
        return await this.exec(item.destroy(params))
    }

    async getItem(params, scopes, fields) {
        
    }

    async getList(params) {
        return await this.Model.findAll({
            where: {

            }
        });
    }

    async update(params, filter) {
        const item = await this.exec(this.getItem(filter));
        return await this.exec(item.update(params));
    }

    async deleteAll() {

    }

}
